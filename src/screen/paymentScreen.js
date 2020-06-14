import React, { useEffect, useState, useContext ,useRef } from 'react'
/* 아임포트 결제모듈을 불러옵니다. */
import IMP from 'iamport-react-native';
/* 로딩 컴포넌트를 불러옵니다. */
import Loading from '../component/loading';

import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'

export function paymentScreen({route ,navigation  }) {

    const appContext = useContext(AppContext)

    const socketContext = useContext(SocketContext)

    const ws = useRef(socketContext.ws)

    useEffect(() => {
        if (!ws.current) return;
    
        ws.current.onmessage = e => {
            const message = JSON.parse(e.data);
            console.log("payment listen")
            console.log(message);
            if(message.operation==="replyVerifyPayment"){
              if(message.body.isSuccess ===true){
                for(let i=0 ; i<message.body.isPaidList.length ; i++ ){
                    for(let j=0 ; j<appContext.userList.length ; j++ ){
                        if(message.body.isPaidList[i].id===appContext.userList[j].id){
                            appContext.userList[j]["isPaid"]=message.body.isPaidList[i].isPaid
                            appContext.setUserList([...appContext.userList])
                        }
                    }
                }
                navigation.replace('paymentResult');
                }
            }
            if(message.operation==="notifyCompletePayment"){
                for(let i=0 ; i<appContext.userList.length ; i++ ){
                    if(message.body.id===appContext.userList[i].id){
                        appContext.userList[i].isPaid=true
                        appContext.setUserList([...appContext.userList])
                    }
                }
            }
            if(message.operation==="notifyOrderIsAccepted"){
                Alert.alert(`주문이 접수되었습니다 예상 소요시간은 ${message.body.estimatedTime}분 입니다`)
            }
            if(message.operation==="notifyOrderIsRefused"){
                Alert.alert("주문이 거절되었습니다")
            }
            if(message.operation==="notifyStartDelivery"){
                appContext.setIsDelivered(true)
                Alert.alert("주문이 배달 시작하였습니다")
            }
            if(message.operation==="notifyMemberReceiveDelivery"){
                for (let i=0 ; i <userList.length; i++){
                  if(appContext.userList[i].id===message.body.id){
                    appContext.userList.splice(i,1)
                    appContext.setUserList([...appContext.userList])
                  } 
                } 
              }
        if(message.operation==="ping"){
              const sendMessage = { operation: 'pong'}
              ws.current.send(JSON.stringify(sendMessage))
            }
        };
      });
    
      function verifyPayment(response){
        if (!ws.current) return;
        const message = { operation: 'verifyPayment', body: {impUID: response.imp_uid,merchantUID : response.merchant_uid} }
        ws.current.send(JSON.stringify(message))
      }
    /* [필수입력] 결제 종료 후, 라우터를 변경하고 결과를 전달합니다. */
    function callback(response) {
        console.log(response)
        if(response.imp_success==="true"){
            verifyPayment(response)
        }
        else{
            //payment failed
            navigation.navigate('confirmOrder');
        }
    }

    /* [필수입력] 결제에 필요한 데이터를 입력합니다. */
    const data = {
        pg: 'html5_inicis',
        pay_method: 'card',
        name: '일인식탁',
        merchant_uid: `mid_${new Date().getTime()}`,
        amount: route.params.finalPrice,
        // amount: 100,
        buyer_name: appContext.nickName,
        buyer_tel: route.params.phoneNum,
        buyer_email: appContext.nickName +'@gmail.com',
        buyer_addr: route.params.address,
        buyer_postcode: '99999',
        app_scheme: 'onetable',
        // [Deprecated v1.0.3]: m_redirect_url
    };

    return (
        <IMP.Payment
        userCode={'imp23068912'}    // 가맹점 식별코드
        loading={<Loading />}   // 로딩 컴포넌트
        data={data}             // 결제 데이터
        callback={callback}     // 결제 종료 후 콜백
        />
    );
}

export default paymentScreen;
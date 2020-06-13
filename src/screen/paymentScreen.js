import React, { useEffect, useState, useContext ,useRef } from 'react'
/* 아임포트 결제모듈을 불러옵니다. */
import IMP from 'iamport-react-native';
/* 로딩 컴포넌트를 불러옵니다. */
import Loading from '../component/loading';

import { AppContext } from '../context/AppContext'
import { SocketContext } from '../context/SocketContext'

export function paymentScreen({route ,navigation  }) {

    const appContext = useContext(AppContext)

    /* [필수입력] 결제 종료 후, 라우터를 변경하고 결과를 전달합니다. */
    function callback(response) {
        console.log(response)
        if(response.imp_success==="true"){
            navigation.replace('paymentResult', response);
        }
        else{
            navigation.navigate('confirmOrder');
        }
    }

    /* [필수입력] 결제에 필요한 데이터를 입력합니다. */
    const data = {
        pg: 'html5_inicis',
        pay_method: 'card',
        name: '일인식탁',
        merchant_uid: `mid_${new Date().getTime()}`,
        // amount: route.params.finalPrice,
        amount: 100,
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
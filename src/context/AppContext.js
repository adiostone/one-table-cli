import React, { createContext, useState } from 'react'


export const AppContext = createContext()

export const AppProvider =({children}) =>{
    //GoogleSignIn
    const [accessToken, setAccessToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')

    //userData
    const [userID, setUserID] = useState()
    const [nickname, setNickname] = useState("")

    //LocationInformation
    const [locationIsSet, setLocationIsSet] = useState("false");
    const [location, setLocation] = useState();  
    const [mapRegion, setMapRegion] = useState();
    const [formattedAddress, setFormattedAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("세부주소를 입력해주세요");

    //partyInformation
    const [partyID, setPartyID] = useState() 
    const [restaurantID, setRestaurantID] = useState() 
    const [restaurantName, setRestaurantName] = useState()
    const [isHost, setIsHost] = useState(false)  
    const [isReady, setIsReady] = useState(false)  
    const [size, setSize] = useState()
    const [wholePrice, setWholePrice] = useState(0) 
    const [isEnter, setIsEnter] = useState(false)  
    const [isNotMeet, setIsNotMeet] = useState(false)  
    const [deliveryCost, setDeliveryCost] = useState(0)  
    const [packagingCost, setPackagingCost] = useState(0)  
    const [nonF2FCost, setNonF2FCost] = useState(0)  
    const [finalCart ,setFinalCart] = useState()  

    const [userList, setUserList] = useState([]) 

    //cart Information
    const [cartList, setCartList] = useState([]) 

  
    return (
      <AppContext.Provider
        value={{
          accessToken,
          setAccessToken,
          refreshToken,
          setRefreshToken,

          userID,
          setUserID,
          nickname,
          setNickname,

          locationIsSet,
          setLocationIsSet,
          location,
          setLocation,
          mapRegion,
          setMapRegion,
          formattedAddress,
          setFormattedAddress,
          detailAddress,
          setDetailAddress,


          partyID, 
          setPartyID, 
          restaurantID, 
          setRestaurantID,
          restaurantName, 
          setRestaurantName,
          isHost,
          setIsHost,
          isReady,
          setIsReady,
          size,
          setSize,
          wholePrice, 
          setWholePrice,
          isEnter,
          setIsEnter,
          isNotMeet,
          setIsNotMeet,
          packagingCost,
          setPackagingCost,
          nonF2FCost,
          setNonF2FCost,
          deliveryCost,
          setDeliveryCost,

          userList,
          setUserList,

          cartList, 
          setCartList,
          finalCart,
          setFinalCart
          
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }
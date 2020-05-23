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

    //shoppingBagInformation
    const [bagFoodList, setBagFoodList] = useState([]) 

  
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


          bagFoodList, 
          setBagFoodList,
          
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }
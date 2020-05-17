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

    //shoppingBagInformation
    const [shoppingBagList, setShoppingBagList] = useState() 

  
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

          shoppingBagList, 
          setShoppingBagList,
          
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }
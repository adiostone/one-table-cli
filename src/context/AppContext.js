import React, { createContext, useState } from 'react'


export const AppContext = createContext()

export const AppProvider =({children}) =>{
    //GoogleSignIn
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [accessToken, setAccessToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')

    //LocationInformation
    const [locationIsSet, setLocationIsSet] = useState("false");
    const [location, setLocation] = useState();  
    const [mapRegion, setMapRegion] = useState();
    const [formattedAddress, setFormattedAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("세부주소를 입력해주세요");
  
    return (
      <AppContext.Provider
        value={{
          isSignedIn,
          setIsSignedIn,
          accessToken,
          setAccessToken,
          refreshToken,
          setRefreshToken,
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
          
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }
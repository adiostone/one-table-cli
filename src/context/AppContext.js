import React, { createContext, useState } from 'react'


export const AppContext = createContext()

export const AppProvider =({children}) =>{
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [accessToken, setAccessToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')
    const [location, setLocation] = useState();  
    const [formattedAddress, setFormattedAddress] = useState("");
    const [detailLocation, setDetailLocation] = useState("");
    const [locationIsSet, setLocationIsSet] = useState(false);
  
    return (
      <AppContext.Provider
        value={{
          isSignedIn,
          setIsSignedIn,
          accessToken,
          setAccessToken,
          refreshToken,
          setRefreshToken,
          location,
          setLocation,
          formattedAddress,
          setFormattedAddress,
          detailLocation,
          setDetailLocation,
          locationIsSet,
          setLocationIsSet,
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }
import React, { createContext, useState } from 'react'


export const AppContext = createContext()

export const AppProvider =({children}) =>{
    const [accessToken, setAccessToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')
    const [location, setLocation] = useState();  
    const [formattedAddress, setFormattedAddress] = useState("");
    const [detailLocation, setDetailLocation] = useState("");
    const [locationIsSet, setLocationIsSet] = useState(false);
  
    return (
      <AppContext.Provider
        value={{
          accessToken,
          setAccessToken,
          refreshToken,
          setRefreshToken,
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }
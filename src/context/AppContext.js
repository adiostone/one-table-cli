import React, { createContext, useState } from 'react'


export const AppContext = createContext()

export const AppProvider =({children}) =>{
    const [accessToken, setAccessToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')
  
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
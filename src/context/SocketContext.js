import React, { createContext, useState } from 'react'


export const SocketContext = createContext()

export const SocketProvider =({children}) =>{
    //ws
    const [ws, setws] = useState(null)

    const [isConnected, setIsConnected] = useState(false)

    
    return (
      <SocketContext.Provider
        value={{
            ws,
            setws,

            isConnected,
            setIsConnected,
        }}
      >
        {children}
      </SocketContext.Provider>
    )
  }
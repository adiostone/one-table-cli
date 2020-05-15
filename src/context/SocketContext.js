import React, { createContext, useState } from 'react'


export const SocketContext = createContext()

export const SocketProvider =({children}) =>{
    //ws
    const [ws, setws] = useState(null)
    
    return (
      <SocketContext.Provider
        value={{
            ws,setws
        }}
      >
        {children}
      </SocketContext.Provider>
    )
  }
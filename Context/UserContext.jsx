/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useEffect } from "react";
import React from 'react'
import { useState } from 'react';

export let UserContext = createContext(0)


export default function UserContextProvider(props) {
  const [userLogin, setUserLogin] = useState(null)

useEffect(() => {
  if(localStorage.getItem('userToken')){
    setUserLogin(localStorage.getItem('userToken'))
  }

  return () => {
    
  }
}, [])

  return (
    <UserContext.Provider value={{userLogin , setUserLogin}}>

    {props.children}
    </UserContext.Provider>
  )
}




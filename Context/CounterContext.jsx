/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext } from "react";
import React from 'react'
import { useState } from 'react';


export let CounterContext = createContext(0) 



export default function CounterContextProvider(props) {

  const [counter, setCounter] = useState(0)
  const [userName, setUserName] = useState('')


  return (
    <>
    
    <CounterContext.Provider value={{counter , userName , setCounter}}>
      {props.children}
    </CounterContext.Provider>
    </>
  )
}

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { useState , useEffect } from 'react';
import Style from './Allorders.module.css'
import axios from 'axios';
import { CartContext } from './../../../Context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Allorders() {
  let navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  let {cartCheckout ,userOrder , setUserOrder} = useContext(CartContext)

  
  console.log(userOrder)

  useEffect(()=>{

    const fetchOrders = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get('http://localhost:3001/api/orders')
        setUserOrder(response.data)
        setIsLoading(false)

        } catch (error) {
          console.error(error)
          }
          
    }

  } , [])


  return (
    <>
    
    
    <h2 className="mt-52">Cart    </h2>
    
    
    </>
  )
}

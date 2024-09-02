/* eslint-disable no-unused-vars */
import React from 'react'
import { useState , useEffect } from 'react';
import Style from './NotFound.module.css'
import img from '../../assets/finalProject assets/error.svg'

export default function NotFound() {

  useEffect(()=>{


  } , [])


  return (
    <>
    
    
<div className=" container flex justify-center items-center my-12">
    <img src={img} alt="Not Found" className='w-2/3' />
</div>
    
    </>
  )
}

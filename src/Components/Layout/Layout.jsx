/* eslint-disable no-unused-vars */
import React from 'react'
import { useState , useEffect } from 'react';
import Style from './Layout.module.css'
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {

  useEffect(()=>{


  } , [])


  return (
    <>
    
    <Navbar/>
    <div className=" py-6 overflow-x-hidden ">
      <Outlet/>
    </div>
  
    </>
  )
}

/* eslint-disable no-unreachable */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useState , useEffect } from 'react';
import Style from './ProtectedRoute.module.css'
import { Navigate, useNavigate } from 'react-router-dom';

export default function ProtectedRoute(props) {
let navigate = useNavigate()
if(localStorage.getItem('userToken')){
  return props.children
}
else{
 return <Navigate to='/login'/>
}


return(<>

</>)
}

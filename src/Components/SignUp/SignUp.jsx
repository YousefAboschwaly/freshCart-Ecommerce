/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { useState , useEffect } from 'react';
import Style from './SignUp.module.css'
import { useFormik } from 'formik';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { UserContext } from '../../../Context/UserContext';
export default function SignUp() {
  let navigate = useNavigate()
  const [isError, setIsError] = useState('')
const [isLoading, setIsLoading] = useState(false)
  const passwordRegex = /^[A-Z][a-z0-9]{5,10}$/

  let {userLogin ,setUserLogin} = useContext(UserContext)
const validation = Yup.object().shape({
  name:Yup.string().required('Name is required').min(3, 'Name should be more than 2 characters').max(20,'Name should be less than 20 characters'),
  email:Yup.string().required('Email is required').email('Invalid email'),
  phone:Yup.string().matches(/^01[0125][0-9]{8}$/ , 'invalid Phone').required('Phone is required'),
  password:Yup.string().required('Password is required').matches(passwordRegex,'Password should be at least 8 characters and at least one special characters'),
  rePassword:Yup.string().required('RePassword is required').oneOf([Yup.ref('password')],'Password and RePassword should be same')
})


 function handleRegister(formValues) {
  setIsLoading(true)
  console.log(formValues)
  axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , formValues)
  .then((apiResponse)=>{

    if(apiResponse.data.message == 'success'){
      navigate('/') ;
      setIsLoading(false) ;
      setUserLogin(apiResponse.data.token)
      console.log(userLogin)
 
       localStorage.setItem('userToken' , apiResponse.data.token);
    }

  })
  .catch((apiResponse)=>{setIsError(apiResponse.response.data.message); setIsLoading(false)})

}


let {handleSubmit , handleChange , handleBlur , values , errors , touched } =  useFormik({
  initialValues:{
    'name':'',
    'email':'', 
    'phone':'',
    'password':'',
    'rePassword':'',
  },
  validationSchema:validation,
  onSubmit:handleRegister ,
})

  return (
    <>

    <div className="max-w-lg mx-auto py-6 mt-10">
      
      {isError &&  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span>{isError}</span>
</div>}
<h2 className='text-3xl text-green-600 font-bold mb-6 text-center'>Register Now</h2>

    <form onSubmit={handleSubmit}>


  <div className="relative z-0 w-full mb-5 group">

      <input onBlur={handleBlur} onChange={handleChange} value={values.name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name </label>
{ errors.name && touched.name &&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span>{errors.name}</span>
</div>}
  </div>


  <div className="relative z-0 w-full mb-5 group">

      <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email </label>
      { errors.email && touched.email &&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span>{errors.email}</span>
</div>}
  </div>


  <div className="relative z-0 w-full mb-5 group">

      <input onBlur={handleBlur} onChange={handleChange} value={values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Phone </label>
      { errors.phone && touched.phone &&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span>{errors.phone}</span>
</div>}
  </div>

  <div className="relative z-0 w-full mb-5 group">

      <input onBlur={handleBlur} onChange={handleChange} value={values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter password </label>
      { errors.password && touched.password &&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span>{errors.password}</span>
</div>}
  </div>

  <div className="relative z-0 w-full mb-5 group">

      <input onBlur={handleBlur} onChange={handleChange} value={values.rePassword} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password </label>
      { errors.rePassword && touched.rePassword &&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span>{errors.rePassword}</span>
</div>}
  </div>



  <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        {isLoading? <i className='fas fa-spinner fa-spin'></i> : 'Submit'}

  </button>

  </form>

    </div>
    
    
    </>
  )
}

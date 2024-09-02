/* eslint-disable no-unused-vars */
import React from 'react'
import { useState , useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import LoadingScreen from './../LoadingScreen/LoadingScreen';

export default function VerifyCode() {

  let navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')

  const validation = Yup.object().shape({

    resetCode:Yup.string().required('is required'),

  
  })



  function handleVerifyResetCode(formValues) {
    setIsLoading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode' , formValues)
    .then((apiResponse)=>{
      if(apiResponse.data.status == 'Success'){
        navigate('/reset-password')     
           setIsLoading(false) ;

         }
    })
    .catch((apiResponse)=>{setIsError(apiResponse.response.data.message); setIsLoading(false)})
  
  }



  useEffect(()=>{


  } , [])
  
  let {handleSubmit , handleChange , handleBlur , values , errors , touched } =  useFormik({
    initialValues:{
      
      'resetCode':'', 

  
    },
    validationSchema:validation,
    onSubmit: handleVerifyResetCode 
      
  })
  

  return (
    <>
    
    <div className="max-w-2xl mx-auto py-6 mt-10">
      { isLoading && <div className="fixed inset-0 w-full  z-50">
            <LoadingScreen />
          </div>}
      
      {isError &&  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span>{isError}</span>
</div>}

    <form onSubmit={handleSubmit}>



<h2 className='text-2xl  font-bold mb-6'> reset your account password </h2>

<div className="relative z-0 w-full mb-5 group">

<input onBlur={handleBlur} onChange={handleChange} value={values.resetCode} type="text" name="resetCode" id="resetCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
<label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Code </label>
{ errors.resetCode && touched.resetCode &&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<span>{errors.resetCode}</span>
</div>}
</div>



<button  type='submit'   className="hover:text-white text-green-700 mt-5 hover:bg-green-700 border border-green-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" >Verify</button>


  </form>

    </div>
    
    
    </>
  )
}

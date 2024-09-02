/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { useState , useEffect } from 'react';
import Style from './Login.module.css'
import { useFormik } from 'formik';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { UserContext } from '../../../Context/UserContext';
export default function Login() {
let navigate = useNavigate()
const [isError, setIsError] = useState('')
const [isLoading, setIsLoading] = useState(false)
const passwordRegex = /^[A-Z][a-z0-9]{5,10}$/
 let {userLogin,setUserLogin} = useContext(UserContext)


const validation = Yup.object().shape({

  email:Yup.string().required('Email is required').email('Invalid email'),
  password:Yup.string().required('Password is required').matches(passwordRegex,'Password should be at least 8 characters and at least one special characters'),

})


 function handleLogin(formValues) {
  setIsLoading(true)
  console.log(formValues)
  axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , formValues)
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
    
    'email':'', 
    'password':''

  },
  validationSchema:validation,
  onSubmit:handleLogin ,
})

  return (
    <>

    <div className="max-w-lg mx-auto py-6 mt-10">
      
      {isError &&  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span>{isError}</span>
</div>}
<h2 className='text-3xl text-green-600 font-bold mb-6 text-center'>Login</h2>

    <form onSubmit={handleSubmit}>




  <div className="relative z-0 w-full mb-5 group">

      <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email </label>
      { errors.email && touched.email &&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span>{errors.email}</span>
</div>}
  </div>



  <div className="relative z-0 w-full mb-5 group">

      <input onBlur={handleBlur} onChange={handleChange} value={values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter password </label>
      { errors.password && touched.password &&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span>{errors.password}</span>
</div>}
  </div>


<div className="flex items-center">

<button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        {isLoading? <i className='fas fa-spinner fa-spin'></i> : 'Login'}

  </button>
  <p className='ps-5'>Don't have Account <span className='font-semibold text-green-600'><Link to='/register'>Register Now</Link></span></p>


</div>
<Link to='/forget-password'>
<button className="text-white mt-5 bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Forget Password</button>
</Link>


  </form>

    </div>
    
    
    </>
  )
}

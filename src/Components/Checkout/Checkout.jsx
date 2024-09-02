/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { useState , useEffect } from 'react';
import Style from './Checkout.module.css'
import { useFormik } from 'formik';
import {Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { UserContext } from '../../../Context/UserContext';
import { CartContext } from '../../../Context/CartContext';
import axios from 'axios';


export default function Checkout() {
let {cart} = useContext(CartContext)
  const [isError, setIsError] = useState('')
const [isLoading, setIsLoading] = useState(false)
const phoneRegex = /^[01][0125][0-9]{9}$/
 let {cartCheckout } = useContext(CartContext)

 useEffect(() => {
 

 }, [])
 

const validation = Yup.object().shape({

  details:Yup.string().required('Details is required').min(5,'Details must be more than 5 Characters').max(100,'Details must be less than 100 Characters'),
  phone:Yup.string().required('Phone is required').matches(phoneRegex,'Invalid phone number *Enter egyptian number*'),
  city:Yup.string().required('City is required')

})


async function handleCheckout(cartId , url , formValues) {
  setIsLoading(true)
  let response = await cartCheckout(cartId , url , formValues )
  setIsLoading(false)
  if(response.data.status === 'success'){
    window.location.href =response.data.session.url
  }
  
  }
  
  
  


let {handleSubmit , handleChange , handleBlur , values , errors , touched } =  useFormik({
  initialValues:{
    
  'details':'',
  'phone':'',
  'city':'',

  },
  validationSchema:validation,
  onSubmit:()=>handleCheckout(cart?.cartId , 'https://ecommerce-mu-drab-46.vercel.app/' ,values ) ,
})

  return (
    <>

    <div className="max-w-2xl my-10 mx-auto p-6">
      
      {isError &&  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span>{isError}</span>
</div>}
<h2 className='text-3xl text-green-600 font-bold mb-6 text-center'>Checkout</h2>

    <form onSubmit={handleSubmit}>




  <div className="relative z-0 w-full mb-5 group">

      <input onBlur={handleBlur} onChange={handleChange} value={values.details} type="text" name="details" id="details" className=" focus:outline-0 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Details </label>
      { errors.details && touched.details &&<div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span>{errors.details}</span>
</div>}
  </div>





  <div className="relative z-0 w-full mb-5 group">

      <input onBlur={handleBlur} onChange={handleChange} value={values.phone} type="tel" name="phone" id="phone" className=" focus:outline-0 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone </label>
      { errors.phone && touched.phone &&<div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span>{errors.phone}</span>
</div>}
  </div>



  <div className="relative z-0 w-full mb-5 group">

      <input onBlur={handleBlur} onChange={handleChange} value={values.city} type="text" name="city" id="city" className=" focus:outline-0 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">city </label>
      { errors.city && touched.city &&<div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span>{errors.city}</span>
</div>}
  </div>





<div className="flex items-center ">

<button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        {isLoading? <i className='fas fa-spinner fa-spin'></i> : 'Pay Now'}

  </button>

</div>


  </form>

    </div>
    
    
    </>
  )
}

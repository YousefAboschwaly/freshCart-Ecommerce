/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import LoadingScreen from './../LoadingScreen/LoadingScreen';
import { UserContext } from '../../../Context/UserContext';

export default function ResetPassword() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const passwordRegex = /^[A-Z][a-z0-9]{5,10}$/; // Adjust the regex based on actual requirements
  let {userLogin,setUserLogin} = useContext(UserContext)

  const validation = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid email'),
    newPassword: Yup.string().required('Password is required').matches(passwordRegex, 'Password should be at least 8 characters and at least one special character'),
  });

  function handleLogin(formValues) {
    console.log(formValues)
    setIsLoading(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', {email:formValues.email , password:formValues.newPassword})
      .then((apiResponse) => {
        if (apiResponse.data.message === 'success') {
          setUserLogin(apiResponse.data.token);
          localStorage.setItem('userToken', apiResponse.data.token);
          setIsLoading(false);
          navigate('/');
        }
      })
      .catch((apiResponse) => {
        setIsError(apiResponse.response.data.message);
        setIsLoading(false);
      });
  }

  function handleResetPassword(formValues) {
    setIsLoading(true);
    axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', formValues)
      .then((apiResponse) => {
        console.log(apiResponse)
        
          handleLogin(formValues);
        
      })
      .catch((apiResponse) => {
        setIsError(apiResponse.response.data.message);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    // Your side-effects or cleanup code here
  }, []);

  let { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema: validation,
    onSubmit: handleResetPassword,
  });

  return (
    <>
      <div className="max-w-2xl mx-auto py-6 mt-10">
        {isLoading && <div className="fixed inset-0 w-full z-50"><LoadingScreen /></div>}
        {isError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span>{isError}</span>
        </div>}

        <form onSubmit={handleSubmit}>
          <h2 className='text-2xl font-bold mb-6'>Reset your account password</h2>

          <div className="relative z-0 w-full mb-5 group">
            <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
            {errors.email && touched.email && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span>{errors.email}</span>
            </div>}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input onBlur={handleBlur} onChange={handleChange} value={values.newPassword} type="password" name="newPassword" id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
            <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter newPassword</label>
            {errors.newPassword && touched.newPassword && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span>{errors.newPassword}</span>
            </div>}
          </div>

          <button type='submit' className="hover:text-white text-green-700 mt-5 hover:bg-green-700 border border-green-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center">Reset Password</button>
        </form>
      </div>
    </>
  );
}

/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/finalProject assets/freshcart-logo.svg'
import { CounterContext } from '../../../Context/CounterContext';
import { UserContext } from '../../../Context/UserContext';
import { CartContext } from '../../../Context/CartContext';
import { Link } from 'react-router-dom';
export default function Navbar() {

  let navigate = useNavigate()
  const [isNavOpen, setIsNavOpen] = useState(false);

  let {userLogin , setUserLogin} = useContext(UserContext)
  let {cart} = useContext(CartContext)
 
function logout(){
  localStorage.removeItem('userToken')
  setUserLogin(null)
  navigate('/login')
  setIsNavOpen(false)
}
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="bg-gray-100 border-gray-200 dark:bg-gray-900 z-[9999] fixed top-0 w-full  ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">



        <div  className="flex items-center space-x-3 rtl:space-x-reverse ">
        <Link to='/'>
        <img src={logo} className="w-[110px]" alt="Fresh cart  Logo" />
        </Link>
          <div className='hidden lg:block'>
          <ul className="bg-transparent font-medium flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">

          {userLogin ? <>
            <li>
              <NavLink to="" className="block py-2 px-3  text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#4fa74f] lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Home</NavLink>
            </li>

            <li>
              <NavLink to="cart" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#4fa74f] lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Cart</NavLink>
            </li>

            <li>
              <NavLink to="WishList" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#4fa74f] lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Wish list</NavLink>
            </li>

            <li>
              <NavLink to='products' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#4fa74f] lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Products</NavLink>
            </li>

            <li>
              <NavLink to="categories" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#4fa74f] lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Categories</NavLink>
            </li>

            <li>
              <NavLink to="brands" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#4fa74f] lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Brands</NavLink>
            </li>
          </>:null}
          </ul>
        </div>

        </div>


        <button
          onClick={toggleNav}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isNavOpen ? 'true' : 'false'}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>

        <div className={`${isNavOpen ? 'block' : 'hidden'} w-full lg:block lg:w-auto`} id="navbar-default">
          <ul className="bg-transparent font-medium flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">

          <div className="lg:hidden">
          {userLogin ? <>
            <li>
              <NavLink to="" className="block py-2 px-3 text-gray-900 rounded lg:hover:bg-transparent lg:border-0 lg:hover:text[#4fa74f] lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent" >Home</NavLink>
            </li>

            <li>
              <NavLink to="cart" className="block py-2 px-3 text-gray-900 rounded lg:hover:bg-transparent lg:border-0 lg:hover:text-[#4fa74f] lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Cart</NavLink>
            </li>

            <li>
              <NavLink to="WishList" className="block py-2 px-3 text-gray-900 rounded lg:hover:bg-transparent lg:border-0 lg:hover:text-[#4fa74f] lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Wish list</NavLink>
            </li>

            <li>
              <NavLink to='products' className="block py-2 px-3 text-gray-900 rounded lg:hover:bg-transparent lg:border-0 lg:hover:text-[#4fa74f] lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Products</NavLink>
            </li>

            <li>
              <NavLink to="categories" className="block py-2 px-3 text-gray-900 rounded lg:hover:bg-transparent lg:border-0 lg:hover:text-[#4fa74f] lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Categories</NavLink>
            </li>

            <li>
              <NavLink to="brands" className="block py-2 px-3 text-gray-900 rounded lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent">Brands</NavLink>
            </li>
          </> :null}
          </div>

          <div className="links flex justify-between  lg:justify-center items-center gap-5 lg:flex-row">
          <li className='lg:mr-0'>
              <a href="https://instagram.com" target='blank' className='block py-2 px-3  text-gray-900 rounded lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent hover:text-blue-700'><i className='fab fa-instagram text-xl'></i></a>
            </li>

          <li className='lg:mr-0'>
              <a href="https://facebook.com" target='blank' className='block py-2 px-3  text-gray-900 rounded lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent hover:text-blue-700'><i className='fab fa-facebook text-xl'></i></a>
            </li>

          <li className='lg:mr-0'>
              <a href="https://tiktok.com" target='blank' className='block py-2 px-3  text-gray-900 rounded lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent hover:text-blue-700'><i className='fa-brands fa-tiktok text-xl'></i></a>
            </li>

          <li className='lg:mr-0'>
              <a href="https://twitter.com" target='blank' className='block py-2 px-3  hover:text-blue-700 text-gray-900 rounded lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent'><i className='fab fa-twitter text-xl'></i></a>
            </li>
          <li className='lg:mr-0'>
              <a href="https://linkedin.com" target='blank' className='block py-2 px-3  text-gray-900 rounded lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent hover:text-blue-700'><i className='fab fa-linkedin text-xl'></i></a>
            </li>

          <li className='lg:mr-0'>
              <a href="https://youtube.com" target='blank' className='block py-2 px-3  text-gray-900 rounded lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent hover:text-blue-700'><i className='fab fa-youtube text-xl'></i></a>
            </li>
          </div>
{userLogin === null ? <>

  <li>
              <NavLink to="login" className="block py-2 px-3 text-gray-900 rounded lg:hover:bg-transparent lg:border-0 lg:hover:text-[#4fa74f] lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent" >Login</NavLink>
            </li>
          <li>
              <NavLink to="register" className="block py-2 px-3 text-gray-900 rounded lg:hover:bg-transparent lg:border-0 lg:hover:text-[#4fa74f] lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent" >SignUp</NavLink>
            </li>

</>: <>

<li className='text-center cart lg:my-0 my-2'>

<Link to='/cart' className="relative cursor-pointer   ">
{ 
<div className=' px-[.65em] py-[0.35em] rounded-md text-white bg-[#4fa74f] absolute -top-5 -end-1 text-xs '>{cart && cart.numOfCartItems|| '0'}</div>
}
<i className="fa-solid fa-cart-shopping text-[1.75rem] text-[#000000a6] hover:text-[#000000cc] "></i>


</Link>
</li>

<li className='text-center'>
              <span onClick={logout} className=" cursor-pointer block py-2 px-3 text-gray-900 rounded lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent" >Logout</span>
            </li>


            
            </>}




          </ul>
        </div>



      </div>
    </nav>
  );
}

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem('userToken')
  };
  const [userOrder, setUserOrder] = useState([])
  const [cart, setCart] = useState(null)


  function getLoggedUserCart() {
   return  axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => response)
      .catch((error) => error);
  }

  function addProductCart(productId) {
   return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId} ,{ headers })
      .then((response) => response)
      .catch((error) => error);
  }


  function updateCartItemCount(productId , count) {
   return  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count} ,{ headers })
      .then((response) => response)
      .catch((error) => error);
  }

  function deleteCartItem(productId) {
    return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,{ headers })
       .then((response) => response)
       .catch((error) => error);
   }

   function clearCartItems() {
    return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
       .then((response) => response)
       .catch((error) => error);
   }

   function cartCheckout(cartId , url , formValue) {
    return  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}` , {shippingAddress:formValue} , { headers })
    
       .then((response) => response)
       .catch((error) => error);
   }
   
  
  return (
    <CartContext.Provider value={{ getLoggedUserCart , addProductCart  , updateCartItemCount , deleteCartItem , clearCartItems , cartCheckout , cart , setCart}}>
      {props.children}
    </CartContext.Provider>
  );
}
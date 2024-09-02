/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext } from "react";

export let WishListContext = createContext();

export default function WishListContextProvider(props) {
  let headers = {
    token: localStorage.getItem('userToken')
  };




function getLoggedUserWishList() {
  return  axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
     .then((response) => response)
     .catch((error) => error);
 }

 function addWishListItems(productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId}, {headers})
    .then((response)=>response)
    .catch((error)=>error)
 }
  
 function removeWishListItems(productId){
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {headers})
  .then((response)=>response)
  .catch((error)=>error)
 }


  
  return (
    <WishListContext.Provider value={{ getLoggedUserWishList , addWishListItems , removeWishListItems }}>
      {props.children}
    </WishListContext.Provider>
  );
}
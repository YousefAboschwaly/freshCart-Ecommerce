/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Style from "./Cart.module.css";
import { CartContext } from "../../../Context/CartContext";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link } from 'react-router-dom';

export default function Cart() {
  const { getLoggedUserCart, updateCartItemCount, deleteCartItem, clearCartItems , setCart} = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getCartItems() {
    setIsLoading(true);
    let response = await getLoggedUserCart();
    console.log(response.data)
    setIsLoading(false);
    setCartDetails(response.data.data);
    setCart(response.data)
  }

  async function updateCartCount(productId, count) {
    setIsLoading(true);
    let response = await updateCartItemCount(productId, count);
    setIsLoading(false);
    setCartDetails(response.data.data);
  }

  async function deleteItem(productId) {
    setIsLoading(true);
    let response = await deleteCartItem(productId);
    setIsLoading(false);
    setCartDetails(response.data.data);
    setCart(response.data)
  }

  async function clearAllCart() {
    setIsLoading(true);
    let response = await clearCartItems();
    setIsLoading(false);
    setCartDetails(response.data.data);
    setCart(response.data)
  }



  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      <div className="container bg-[#f8f9fa] py-12 px-5 mt-28 rounded-lg relative">
        {isLoading && (
          <div className="fixed inset-0 w-full  z-50">
            <LoadingScreen />
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[2rem] font-semibold">Cart Shop</h2>
          <Link to={'/checkout'} className="py-2 px-4 text-white text-xl rounded-lg bg-[#0d6efd] border border-[#0d6efd] active:bg-[#0a58ca] active:border-[#0a58ca] focus:ring-4 hover:bg-[#0a58ca] hover:border-[#0a58ca]">
            Check out
          </Link>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h5 className="font-semibold text-xl">
            Total Price:{" "}
            <span className="text-[#22db14]">
              {cartDetails?.totalCartPrice ? cartDetails?.totalCartPrice : "0"} EGP
            </span>
          </h5>
          <h5 className="font-semibold text-xl">
            Total Number of Items:{" "}
            <span className="text-[#22db14]"> {cartDetails?.products.length} </span>
          </h5>
        </div>

        <div className="cart my-6 py-3">
          {cartDetails?.products.map((product) => (
            <div className="item flex flex-col md:flex-row items-center my-3 p-3 border-b" key={product.product._id}>
              <div className="img md:w-[16.66666667%]">
                <img src={product.product.imageCover} className="w-full" />
              </div>

              <div className="info flex flex-col md:flex-row md:justify-between md:items-center md:w-[83.33333333%] w-full mx-5 px-6">
                <div className="text-left">
                  <h5 className="font-semibold text-xl">{product.product.title}</h5>
                  <h6 className="font-semibold text-base my-3 text-[#06bc00fc]">{product.price} EGP</h6>
                  <button className="text-[#dc3544]" onClick={() => deleteItem(product.product.id)}>
                    <i className="fa fa-trash"></i> Remove
                  </button>
                </div>
                <div className="my-5 text-center">
                  <button
                    className="border border-[#22db14] px-3 py-[0.375rem] rounded-md"
                    onClick={() => updateCartCount(product.product.id, product.count + 1)}
                  >
                    +
                  </button>
                  <span className="px-5">{product.count}</span>
                  <button
                    className="border border-[#22db14] px-3 py-[0.375rem] rounded-md"
                    onClick={() => updateCartCount(product.product.id, product.count - 1)}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="py-12">
            <button
              className="border border-[#22db14] block rounded-lg mx-auto px-4 py-2 text-xl hover:bg-[#14db28ed] hover:text-white focus:ring-4 transition-all"
              onClick={clearAllCart}
            >
              Clear Your Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

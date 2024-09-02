/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import Style from './WishList.module.css';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { WishListContext } from '../../../Context/WishListContext';
import { toast } from 'react-hot-toast';
import { CartContext } from './../../../Context/CartContext';

export default function WishList() {
  const [wishList, setWishList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProductIdCart, setCurrentProductIdCart] = useState(null);

  let { addProductCart, setCart } = useContext(CartContext);

  let { getLoggedUserWishList, removeWishListItems } = useContext(WishListContext);

  async function getWishList() {
    setIsLoading(true);
    let response = await getLoggedUserWishList();
    setWishList(response.data.data);
    setIsLoading(false);
  }

  async function removeWishListProduct(productId) {
    setIsLoading(true);
    try {
      let response = await removeWishListItems(productId);
    
      if (response.data.status == "success") {
        // Filter out the removed product from the wishlist
        setWishList(() => wishList.filter((product) => product._id !== productId));
      } else {
        console.error("Failed to remove item from wishlist");
      }
    } catch (error) {
      console.error("An error occurred while removing the product:");
    }
    setIsLoading(false);
  }


// Cart Code

async function handleAddToCart(productId) {
  setIsLoading(true);
  setCurrentProductIdCart(productId);

  let response = await addProductCart(productId);

  setIsLoading(false);
  if (response.data.status === "success") {
    setCart(response.data);
    toast.success(response.data.message + `🛺`, {
      duration: 4000,
      position: "top-right",
      icon: (
        <i
          className="fa-solid fa-check"
          style={{
            fontSize: "28px",
            color: "white",
          }}
        ></i>
      ),
      style: {
        background: "#4FA74F",
        color: "white",
        padding: "10px",
      },
    });
  } else {
    toast.error(response.data.message, {
      duration: 4000,
      position: "top-right",
      icon: (
        <i
          className="fa-solid fa-xmark"
          style={{
            fontSize: "28px",
            color: "white",
          }}
        ></i>
      ),
      style: {
        background: "#FF0000",
        color: "white",
        padding: "10px",
      },
    });
  }
  removeWishListProduct(productId)

}


  

  useEffect(() => {
    getWishList();
  }, []);

  return (
    <>
      <div className="container bg-[#f8f9fa] py-12 px-5 mt-28 rounded-lg relative">
        {isLoading && (
          <div className="fixed inset-0 w-full z-50">
            <LoadingScreen />
          </div>
        )}

        <div className="flex mb-6">
          <h2 className="text-[2rem] font-semibold">My Wish List</h2>
        </div>

        <div className="wishList my-6 py-3">
          {wishList?.map((product) => 
          
          <div className="item flex flex-col md:flex-row items-center my-3 p-3 border-b" key={product._id}>
              <div className="img md:w-[16.66666667%]">
                <img src={product.imageCover} className="w-full" alt={product.title} />
              </div>

              <div className="info flex flex-col md:flex-row md:justify-between md:items-center md:w-[83.33333333%] w-full mx-5 px-6">
                <div className="text-left">
                  <h5 className="font-semibold text-xl">{product.title}</h5>
                  <h6 className="font-semibold text-base my-3 text-[#06bc00fc]">{product.price} EGP</h6>
                  <button className="text-[#dc3544]" onClick={() => removeWishListProduct(product._id)}>
                    <i className="fa fa-trash"></i> Remove
                  </button>
                </div>

                <div className="add">
                  <button
                    className="border border-[#22db14] block rounded-lg mx-auto px-4 py-2 text-xl hover:bg-[#14db28ed] hover:text-white focus:ring-4 transition-all"
                    onClick={() => handleAddToCart(product._id)}
                  >
                    {isLoading && product._id === currentProductIdCart ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      "add To Cart"
                    )}
                  </button>
                </div>

              </div>
            </div>
          
          )}
        </div>
      </div>
    </>
  );
}

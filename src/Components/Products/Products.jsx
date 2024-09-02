/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import useProducts from './../../Hooks/useProducts';
import { CartContext } from "../../../Context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from './../../../Context/WishListContext';


export default function Products() {
  let { addProductCart , setCart } = useContext(CartContext);
  let { addWishListItems, removeWishListItems, getLoggedUserWishList } = useContext(WishListContext);
  
  const [Loading, setIsLoading] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(0);

  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [productsToDisplay, setProductsToDisplay] = useState([]);

  const { data, isLoading, isError, error } = useProducts()



  // wishlist Code
  const [isHeartClicked, setIsHeartClicked] = useState(() => {
    const saved = localStorage.getItem("heartClickedState");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3300);
    return () => clearTimeout(timer); // Cleanup the timeout on component unmount
  }, []);


  useEffect(() => {
    localStorage.setItem("heartClickedState", JSON.stringify(isHeartClicked));
  }, [isHeartClicked]);

  useEffect(() => {
    syncWishlistWithHeartState();
  }, []);


  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  function searchProduct(e) {
    const searchIndex = e.target.value;
    setInputValue(searchIndex);

      const filteredProducts = data?.data.data.filter((product) =>
        product.title.toLowerCase().includes(searchIndex.toLowerCase())
      );
      setProductsToDisplay(filteredProducts);
    
  }

  async function getProduct(productId) {
    setIsLoading(true)
    setCurrentProductId(productId)
    let response = await addProductCart(productId);
    if (response.data.status === "success") {
      setCart(response.data)
      setIsLoading(false)
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
      setIsLoading(false)

      toast.error(response.data.message ,{
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
    console.log(response);
  }


  
  // Wishlist code


  async function syncWishlistWithHeartState() {
    let response = await getLoggedUserWishList();
    const wishlistProducts = response?.data.data.map(product => product._id) || [];
    const updatedHeartState = {};

    wishlistProducts.forEach(productId => {
      updatedHeartState[productId] = true;
    });

    setIsHeartClicked(updatedHeartState);
  }

  async function handleAddToWishlist(productId) {
    const updatedHeartState = { ...isHeartClicked, [productId]: !isHeartClicked[productId] };
    setIsHeartClicked(updatedHeartState);
    setIsLoading(true);

    if (updatedHeartState[productId]) {
      let response = await addWishListItems(productId);
      if (response.data.status === "success") {
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
    } else {
      await removeWishListItems(productId);
      toast.error("Product removed from wishlist", {
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
          background: "red",
          color: "white",
          padding: "10px",
        },
      });
    }
    setIsLoading(false);
  }
  



  return (
    <div className="px-4 md:px-0 container">
       {(loading || isLoading ||Loading)&& <div className="fixed inset-0 w-full  z-50">
            <LoadingScreen />
          </div>}
      <div className="text-center py-5 mt-10 " >
        <input
          type="text"
          className="w-3/4 form-control"
          placeholder="Search..."
          onChange={searchProduct}
          value={inputValue}
        />
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        {(inputValue?productsToDisplay:data?.data?.data)?.map((product) => (
          <div
            key={product?.id}
            className="product py-4 px-2 rounded-md cursor-pointer transition-all duration-500"
          >
            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full rounded-md block"
              />
              <p className="text-[#4fa74f] mb-4">{product.category.name}</p>
              <h2 className="mb-2 text-[1rem] font-[500]">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h2>
              <div className="flex justify-between items-center">
                <span>{product.price} EGP</span>
                <div className="flex items-center">
                  <i className="fa fa-star text-[#daa520]"></i>
                  <span>{product.ratingsAverage}</span>
                </div>
              </div>

            </Link>
              <div className="flex justify-center items-center">
                <button className="w-3/4 mt-2 btn translate-y-full opacity-0 bg-[#4fa74f] text-white" onClick={() => getProduct(product.id)}>
                {Loading && product.id === currentProductId ?<i className="fas fa-spinner fa-spin "></i>:'Add +'}
                </button>
                <i
                className={`fa-solid fa-heart mt-4 mx-2 text-[1.75rem] cursor-pointer ${isHeartClicked[product._id] ? 'text-red-600' : ''}`}
                onClick={() => handleAddToWishlist(product._id)}
              ></i>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}

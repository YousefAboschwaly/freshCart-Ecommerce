/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { CartContext } from "../../../Context/CartContext";
import toast from "react-hot-toast";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { WishListContext } from './../../../Context/WishListContext';

export default function ProductDetails() {
  let { addProductCart  , setCart} = useContext(CartContext);
  let { addWishListItems, removeWishListItems, getLoggedUserWishList } = useContext(WishListContext);
  let { id, category } = useParams();

  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [Loading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);





  useEffect(() => {
    async function fetchData() {
      try {
        const productResponse = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        setProductDetails(productResponse.data.data);
        console.log(productDetails)

        const relatedResponse = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
        const related = relatedResponse.data.data.filter(
          (product) => product.category.name === category
        );
        setRelatedProducts(related);
      } catch (error) {
        console.log("Error fetching product details:", error);
      } finally {
        setIsPageLoading(false);
      }
    }
    fetchData();
  }, [id, category]);

  var mainSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    adaptiveHeight: true // This will adjust the height based on the content
  };
  

  var relatedSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay: true,
    responsive: [
      {
        breakpoint: 958,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 758,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  async function handleAddToCart(productId) {
    setIsAddingToCart(true);
    setCurrentProductId(productId);
    try {
      let response = await addProductCart(productId);
      if (response.data.status === "success") {
        setCart(response.data)
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
    } catch (error) {
      console.log("Error adding product to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  }



// wishlist Code
const [isHeartClicked, setIsHeartClicked] = useState(() => {
  const saved = localStorage.getItem("heartClickedState");
  return saved ? JSON.parse(saved) : {};
});

useEffect(() => {
  const timer = setTimeout(() => setLoading(false), 3300);
  return () => clearTimeout(timer); 
}, []);


useEffect(() => {
  localStorage.setItem("heartClickedState", JSON.stringify(isHeartClicked));
}, [isHeartClicked]);

useEffect(() => {
  syncWishlistWithHeartState();
}, []);






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
    <div className="container">
       {(loading  || Loading)&& <div className="fixed inset-0 w-full  z-50">
            <LoadingScreen />
          </div>}
      <div className="flex flex-col md:flex-row gap-5 justify-center items-center outline-0">
        <div className="md:w-1/3 w-full my-4">
          
            <Slider {...mainSliderSettings}>
              {productDetails?.images.map((src) => (
                <img
                  key={productDetails?.id}
                  src={src}
                  alt={productDetails?.title}
                  className="w-full active:cursor-grab block"
                />
              ))}
            </Slider>
          
        </div>

        <div className="md:w-2/3 w-full p-2">
          <h2 className="text-[2rem] font-[500]">
            {productDetails?.title || "Loading..."}
          </h2>
          <p className="mb-4">{productDetails?.description}</p>

          <div className="flex justify-between items-center">
            <span>{productDetails?.price} EGP</span>
            <div className="flex items-center">
              <i className="fa fa-star text-[#daa520]"></i>
              <span>{productDetails?.ratingsAverage}</span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              className="w-3/4 mt-2 btn bg-[#22db14]"
              onClick={() => handleAddToCart(productDetails?._id)}
            >
              {isAddingToCart && currentProductId === productDetails?._id ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Add +"
              )}
            </button>
            <i
                className={`fa-solid fa-heart mt-4 mx-2 text-[1.75rem] cursor-pointer ${isHeartClicked[productDetails?._id] ? 'text-red-600' : ''}`}
                onClick={() => handleAddToWishlist(productDetails._id)}
              ></i>
          </div>
        </div>
      </div>

      <div className=" md:px-0 mt-10 ">
        <h1 className="text-5xl text-center text-[#4fa74f] font-semibold my-5">
          Related Category
        </h1>
        <Slider {...relatedSliderSettings} className="w-full my-6 py-6   ">
          {relatedProducts?.map((product) => (
            <div className="" key={product.id}>

                          <div className="product py-4 m-3  px-2 rounded-md  cursor-pointer transition-all duration-500 ">
              <Link to={`/productdetails/${product.id}/${product.category.name}`}   className="">
                            <div className="">
                            <img
                                src={product.imageCover}
                                alt={product.title}
                                className="w-full rounded-md active:cursor-grab border-none block"
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




            </div>

             
              
          ))}
        </Slider>
      </div>
    </div>
  );
}


/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [specificBrand, setSpecificBrand] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef();

  async function getBrands() {
    setIsLoading(true);
    let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    setBrands(response.data.data);
    setIsLoading(false);
  }

  async function getSpecificBrands(brandId) {
    setIsLoading(true);
    let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);
    setSpecificBrand(response.data.data);
    setIsLoading(false);
    setIsModalOpen(true); // Open the modal
  }

  useEffect(() => {
    getBrands();
  }, []);

  // Close the modal if clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }

    if (isModalOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.body.style.overflow = 'auto'; 
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  function closeModal() {
    setIsModalOpen(false);
    setSpecificBrand(null); 
  }



  return (
    <>
      { isLoading && <div className="fixed inset-0 w-full  z-50">
            <LoadingScreen />
          </div>}
      <div className="container md:px-4 px-10 mt-16">

        <h1 className="text-center text-[#4fa74f] text-[2.5rem] mb-12">All Brands</h1>
        <div className="grid md:grid-cols-4 gap-6">
          {brands?.map((brand) => (
            <div
              key={brand._id}
              className="product cursor-pointer border border-[rgba(0,0,0,.175)] rounded-lg overflow-hidden"
              onClick={() => getSpecificBrands(brand._id)}
            >
              <div>
                <img src={brand.image} alt={brand.name} className="w-full" />
              </div>
              <div className="text-center p-4">
                <p className="mb-4">{brand.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && specificBrand && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center mt-16 w-full h-full bg-black bg-opacity-50 transition-all duration-700"
        >
          <div  className="relative p-4 w-full max-w-xl ">
            <div ref={modalRef} className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-end p-4 md:p-3 border-b rounded-t dark:border-gray-600">

                <button
                  type="button"
                  className="text-gray-400 bg-transparent  hover:text-gray-600 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeModal}
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="px-4 flex justify-between items-center">
                  <div className="left">
                    <h1 className="text-[#4fa74f] font-[500] text-[2.5rem]">{specificBrand.name}</h1>
                    <p className="mb-4">{specificBrand.slug}</p>
                  </div>
                  <div className="right">
                    <img src={specificBrand.image} alt={specificBrand.name} className="w-full" />
                  </div>

              </div>

              <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={closeModal}
                  type="button"
                  className="text-white bg-[#6c757d] hover:bg-[#5c636a] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import Style from "./Categories.module.css";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function getCategories() {
    setIsLoading(true);
    let response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    setIsLoading(false);

    setCategories(response.data.data);
    console.log(categories);
  }

  async function getSubCategories(categoryId, Name) {
    setIsLoading(true);
    let response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
    );
    setIsLoading(false);

    setCategoryName(Name);
    setSubCategories(response.data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="container mt-20 md:px-0 px-5">
        <div className="grid md:grid-cols-3 gap-5">
          {categories?.map((category) => (
            <div key={category._id}>
              <div
                className="product transition-all duration-500 border rounded-md overflow-hidden cursor-pointer"
                onClick={() => getSubCategories(category._id, category.name)}
              >
                <div className="img">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-[300px] object-cover object-center "
                  />
                </div>
                <div className="title p-4">
                  <h3 className="text-[1.75rem]  text-center text-[#198754] font-[500]">
                    {category.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {subCategories.length>0 && (
        <>
          <div className="subcategories container mt-10 mb-16">
            <h2 className="text-center my-5 text-[#4fa74f] text-[2rem] font-[500]">
              {categoryName} subcategories
            </h2>

            <div className="grid md:grid-cols-3 gap-5">
              {subCategories?.map((subCategory) => (
                <div key={subCategory._id}>
                  <div className="product transition-all duration-500 border border-[rgba(0,0,0,.175)] rounded-md overflow-hidden cursor-pointer">
                    <div className="title p-4">
                      <h3 className="text-[1.75rem]  text-center  font-[500]">
                        {subCategory.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

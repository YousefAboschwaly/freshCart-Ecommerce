/* eslint-disable no-unused-vars */
import React from 'react'
import { useState , useEffect } from 'react';
import Style from './CategoriesSlider.module.css'
import axios from "axios";
import Slider from "react-slick";
import Categories from '../Categories/Categories';

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch((error) => {
        console.log("Error fetching categories:", error);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    autoplay: true,
    responsive: [
      {
        breakpoint: 958,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 758,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category?._id} className="my-5">
            <img src={category?.image} alt={category?.name} className="w-full h-[250px] img-CategorySlider active:cursor-grab block" />
            <h3 className="text-[1.75rem] font-semibold text-center">{category?.name}</h3>
          </div>
        ))}
      </Slider>
    </>
  );
}

/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import Style from "./MainSlider.module.css";
import sliderImg1 from "../../assets/finalProject assets/images/slider-image-1.jpeg";
import sliderImg2 from "../../assets/finalProject assets/images/slider-image-2.jpeg";
import sliderImg3 from "../../assets/finalProject assets/images/slider-image-3.jpeg";
import img1 from "../../assets/finalProject assets/images/slider-2.jpeg";
import img2 from "../../assets/finalProject assets/images/grocery-banner-2.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  useEffect(() => {}, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay: true,
  };
  return (
    <>
      <div className="container">
        <div className="flex md:flex-row flex-col md:gap-0 gap-5 my-7">
          <div className="md:w-2/3 w-full md:m-0 my-4">
            <Slider {...settings}>
              <img src={sliderImg3} alt="img3" className="w-full h-[400px]  active:cursor-grab block" />
              <img src={sliderImg1} alt="img1" className="w-full h-[400px] active:cursor-grab block" />
              <img src={sliderImg2} alt="img2" className="w-full h-[400px] active:cursor-grab block" />
            </Slider>
          </div>
          <div className="md:w-1/3 w-full">
            <img src={img1} alt="pic1" className="w-full h-[200px]" />
            <img src={img2} alt="pic2" className="w-full h-[200px]" />
          </div>
        </div>
      </div>
    </>
  );
}

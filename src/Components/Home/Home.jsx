/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Style from './Home.module.css';
import axios from 'axios';
import RecentProduct from '../RecentProduct/RecentProduct';
import CategoriesSlider from './../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';

export default function Home() {


  return (
    <>
    <MainSlider/>
    <CategoriesSlider/>
    <RecentProduct/>
    </>
  );
}

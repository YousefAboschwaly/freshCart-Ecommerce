/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useProducts() {

  function getRecent() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const responseObject = useQuery({
    queryKey: ["recentProduct"],
    queryFn: getRecent,
    staleTime:80000,
    
  });


  return (
    responseObject
  )
}

import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import NotFound from "./Components/NotFound/NotFound";
import CounterContextProvider from "../Context/CounterContext";
import UserContextProvider from "../Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "../Context/CartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./Components/Checkout/Checkout";
import Allorders from "./Components/Allorders/Allorders";
import WishList from "./Components/WishList/WishList";
import WishListContextProvider from "../Context/WishListContext";
import ForgetPassword from './Components/Forget-Password/ForgetPassword';
import VerifyCode from './Components/Verify-Code/VerifyCode';
import ResetPassword from './Components/Reset-Password/ResetPassword';
let query = new QueryClient();

function App() {
  let routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id/:category",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "register", element: <SignUp /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "verify-code", element: <VerifyCode /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={query}>
        <UserContextProvider>
          <CounterContextProvider>
            <WishListContextProvider>
              <CartContextProvider>
                <RouterProvider router={routes} />
                <ReactQueryDevtools />
                <Toaster />
              </CartContextProvider>
            </WishListContextProvider>
          </CounterContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;

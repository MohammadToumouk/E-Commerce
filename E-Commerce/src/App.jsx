import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/homePage';
import Privacy from '../src/pages/Privacy/Privacy';
import AboutUs from '../src/pages/AboutUs/AboutUs';
import ShopPage from '../src/pages/ShopPage/ShopPage';
import Navbar from './components/Navbar/navbar';
import Footer from './components/Footer/Footer';
import ProductPage from './pages/ProductPage/ProductPage';
import './app.css';
import Login from './components/Login/login';
import Signup from './components/Signup/signup';
import MyProfile from './pages/MyProfile/MyProfile';
import Stripe from './components/stripe';
import { SuccessPayment } from './pages/PaymentPages/SuccessPayment';
import { ErrorPayment } from './pages/PaymentPages/ErrorPayment';
import axios from 'axios';
import { Toaster } from "../src/components/shadcn/toaster"

import Blog from './pages/Blog/Blog';

import SecondFooter from './components/Footer/SecondFooter';
import Contact from './pages/ContactUs/Contact';


const App = () => {
  const [customer, setCustomer] = useState()
  const [shoppingList, setShoppingList] = useState()
   
  useEffect(() => {
    const fetchShoppingCart = async () => {
      await axios.get('http://localhost:3069/cart', { withCredentials: true })
        .then((response) => {
          setShoppingList(response.data)
         // console.log(shoppingList.cart)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    fetchShoppingCart()
  }, [])  

  useEffect(() => {
    const fetchCustomer = async () => {
      await axios.get('http://localhost:3069/customer/profile', { withCredentials: true })
        .then((response) => {
          setCustomer(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    fetchCustomer()
  }, []);


  return (

    <BrowserRouter>
      <Toaster />
      <Navbar customer={customer} shoppingList={shoppingList} setShoppingList={setShoppingList} />
      {/* <Stripe /> */}
      <Routes>
        
        {/* <Sidebar /> */}
        <Route path="/" exact element={<HomePage />} />
        <Route path="/shop/:id" element={<ProductPage setShoppingList={setShoppingList} shoppingList={shoppingList}/>} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/About" element={<AboutUs />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/myprofile" element={<MyProfile setCustomer={setCustomer} customer={customer}/>}/>
        <Route path="/login" element={<Login />}/>  
        <Route path="/contact" element={<Contact />}/>
        <Route path="/blog" element={<Blog />}/>

        <Route path="/successpayment" element={<SuccessPayment />}/>  
        <Route path="*" element={<ErrorPayment />}/>
      </Routes>
      <SecondFooter />
    </BrowserRouter>
  );
};

export default App;

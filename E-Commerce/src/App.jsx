import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage/homePage';
import Privacy from '../src/pages/Privacy/Privacy';
import AboutUs from '../src/pages/AboutUs/AboutUs';
import ShopPage from '../src/pages/ShopPage/ShopPage';
import Navbar from './components/Navbar/navbar';
import Footer from './components/Footer/Footer';
import ProductPage from './pages/ProductPage/ProductPage';
import './app.css';
import Login from './components/Login/login';
import ToastProvider from './components/toast-provider.jsx';
import Signup from './components/Signup/signup';
import MyProfile from './pages/MyProfile/MyProfile';
import Stripe from './components/stripe';
import { SuccessPayment } from './pages/PaymentPages/SuccessPayment';
import { ErrorPayment } from './pages/PaymentPages/ErrorPayment';
import axios from 'axios';


const App = () => {
  const [customer, setCustomer] = useState()

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
  }, [])

  console.log("currentUser:", customer)

  return (
    <Router>
      <ToastProvider />
      <Navbar customer={customer} />
      <Stripe />
      {/* <Sidebar /> */}
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/shop/:id" component={ProductPage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/About" component={AboutUs} />
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/myprofile" component={MyProfile}/>
        <Route path="/login" component={Login}/> 
        <Route path="/successpayment" component={SuccessPayment}/>  
        <Route path="*" component={ErrorPayment}/>
       </Switch>
      <Footer />
    </Router>
  );
};

export default App;

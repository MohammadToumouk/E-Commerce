import React from 'react';
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

const App = () => {
  return (
    <Router>
      
      <Navbar />
      <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/shop/:id" component={ProductPage} />
      <Route path="/shop" component={ShopPage} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/About" component={AboutUs} />
      <Route path="/login" component={Login}/>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;

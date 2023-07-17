import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/homePage';
import ShopPage from './pages/ShopPage/ShopPage';
import Privacy from '../src/pages/Privacy/Privacy';
import AboutUs from '../src/pages/AboutUs/AboutUs';

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={HomePage} />
      <Route path="/shop" component={ShopPage} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/About" component={AboutUs} />
    </Router>
  );
};

export default App;

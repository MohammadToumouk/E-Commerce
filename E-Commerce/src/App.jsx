import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './homePage';
import ShopPage from './ShopPage';

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={HomePage} />
      <Route path="/shop" component={ShopPage} />
    </Router>
  );
};

export default App;

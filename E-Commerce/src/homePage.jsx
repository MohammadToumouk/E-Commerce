import React from 'react';
import { Link } from 'react-router-dom';


const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Shopping Web App</h1>
      <Link to="/shop">
        <button>Go to Shop</button>
      </Link>
    </div>
  );
};

export default HomePage;


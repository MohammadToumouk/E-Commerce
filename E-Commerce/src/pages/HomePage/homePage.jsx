import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import '../../components/Navbar/navbar'
import Privacy from '../Privacy/Privacy';
import Carousel from '../../components/Carousel/carousel';

const HomePage = () => {
  return (
    <div>      
      <div className="image-container">
        <div className="image-text">
          <p>FASHION LIKE NEVER BEFORE</p>
          <h1>We bring premium goods for you</h1>
          <Link to="/shop" className="shop-link">
          Go to shop
          <span className="arrow-icon"></span>
        </Link>

       </div>
       
        <img
        src="https://img.etimg.com/thumb/msid-95237936,width-1200,height-900,imgsize-39628,resizemode-8,quality-100/tech/technology/online-shopping-a-pandemic-habit-that-stuck.jpg"
        alt="ShoppingImage"
      style={{ width: '500px', height: 'auto', borderRadius: '8px' }}
  />
  <img src="https://cdn.pixabay.com/photo/2016/11/22/19/08/hangers-1850082_1280.jpg"       
      alt="OverlayImage"
      className="overlay-image"
      style={{ width: '500px', height: 'auto', borderRadius: '8px' }}/>
</div>

    <Carousel />

    </div>
  );
};

export default HomePage;

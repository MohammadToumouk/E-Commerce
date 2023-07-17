import React from 'react';
import { Link } from 'react-router-dom';
// import { Avatar, AvatarFallback, AvatarImage } from "../../components/avatar";
import './HomePage.css';
import Privacy from '../Privacy/Privacy';

const HomePage = () => {
  return (
    <div>
      <nav className="navigation-bar">
        <ul className="navigation-links">
          <li className="navigation-item">
            <Link to="/" className="navigation-link">
              Stores
            </Link>
          </li>
          <li className="navigation-item">
            <Link to="/blog" className="navigation-link">
              Blog
            </Link>
          </li>
          <li className="navigation-item-center">
            EMAzing Online Store
          </li>
          <li className="navigation-item">
            <Link to="/shop" className="navigation-link">
              Shop
            </Link>
          </li>
          <li className="navigation-item">
            <Link to="/about" className="navigation-link">
              About
            </Link>
          </li>
          <div className="shopping-bag-image">
          <img 
          	  src="https://cdn-icons-png.flaticon.com/512/7596/7596622.png" 
              alt="ShoppingCart"
              style={{ width: '20px', height: 'auto' }}
          />
          </div>
          
        </ul>
      </nav>

      
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
<footer className="footer">
        <div className="footer-content">
          <p>&copy; 2023 EMAzing Shopping. All rights reserved.</p>
          <nav className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </nav>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;

import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar/navbar.css';


const Navbar = () => {
    return (
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
    )
}

export default Navbar;
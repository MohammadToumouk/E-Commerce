import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Navbar/navbar.css';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../shadcn/hover-card";

import { Button } from "../Button/button";

const Navbar = () => {

  return (
    <nav className="navigation-bar">
      <ul className="navigation-links">
        <li className="navigation-item">
          <Link to="/" className="navigation-link">
            Home
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

        <div className="shopping-and-login">
        <HoverCard>
          <HoverCardTrigger>
          <div className="shopping-bag-image mr-8 cursor-pointer">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/7596/7596622.png" 
              alt="ShoppingCart"
            />
          </div>
          </HoverCardTrigger>
          <HoverCardContent>
            <h1 className="shopping-cart" >Shopping Cart</h1>
            <p>Here you can see your shopping cart</p>

            <Button className="w-full">Checkout</Button>
          </HoverCardContent>
        </HoverCard>

        <Link to="/login" className="login">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQCX5_wYEa6hyWoqSBOaPbaHw5Ff8Ljp0WcA&usqp=CAU"
            alt="Login"
          />
        </Link>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;

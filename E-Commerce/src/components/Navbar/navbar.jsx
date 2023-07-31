import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Navbar/navbar.css';

import axios from 'axios';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../shadcn/hover-card";

import { Button } from "../Button/button";

const Navbar = ({customer}) => {
  const [shoppingList, setShoppingList] = useState()

  useEffect(() => {
    const fetchShoppingCart = async () => {
      await axios.get('http://localhost:3069/cart', { withCredentials: true })
        .then((response) => {
          setShoppingList(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    fetchShoppingCart()
  }, [])

  console.log("shoppingList:", shoppingList?.cart?.items?.length )

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
        {!customer ? (
        <Button className="navigation-login-button">
          <Link to="/login" className="login">
            Login
          </Link>
        </Button>
        ) : (
          
        <div className="shopping-and-login">
        {customer?.customer?._id === shoppingList?.cart?.customer && (
        <HoverCard>
          {!shoppingList?.cart?.items?.length < 1 ? ( 
          <HoverCardTrigger className="shopping-cart-container">
            <div className="shopping-bag-image cursor-pointer">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/7596/7596622.png"
                alt="ShoppingCart"
              />
            </div>
            <div>
                {shoppingList?.cart?.items?.length}
            </div>
            </HoverCardTrigger>
          ) : (
            <HoverCardTrigger>
              <div className="shopping-bag-image cursor-pointer">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/7596/7596622.png"
                    alt="ShoppingCart"
                  />
                </div>
            </HoverCardTrigger>
          )}
          <HoverCardContent className="w-full">
            <h1 className="shopping-cart" >Shopping Cart</h1>
            {shoppingList?.cart?.items?.length >= 1 ? (
              <div className="shopping-cart-empty">Your cart is empty</div> ) : (
                <>
              {shoppingList?.cart?.items?.map((item) => (
                <div className="" key={item.product}>
                  <div className="shopping-cart-item" >
                    <img 
                      src={"https://www.pngmart.com/files/15/Apple-iPhone-12-PNG-Picture.png"}
                      alt="Product"
                      className='shopping-cart-product-image'
                    />
                    <div>
                    <div className="shopping-cart-product-name">{"Product Name"}</div>
                  <div className="shopping-cart-product-price">{"$"}{"1500"}</div>
                    </div>
                    
                    <div className="shopping-cart-quantity"> 
                    <input 
                      type="number"
                      className='shopping-cart-quantity-input'
                      min={1}
                      placeholder='1'
                    />
                  </div>
                  
                  </div>

                </div>
                ))
              }
              <div className="shopping-cart-total">
                <div className="shopping-cart-total-price">Total: </div>
                <div className="shopping-cart-total-price">{"$"}{"1500"}</div>
              </div>
            <Button variant="ghost" className="w-full">View Cart</Button>
            </>
            )}
            <Button className="w-full">Checkout</Button>
          </HoverCardContent>
        </HoverCard>
        )}

        <Link to="/login" className="login ml-5">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQCX5_wYEa6hyWoqSBOaPbaHw5Ff8Ljp0WcA&usqp=CAU"
            alt="Login"
          />
        </Link>
        </div>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

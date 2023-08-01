import React, { useEffect, useState,useRef } from 'react';
import { Link } from 'react-router-dom';
import '../Navbar/navbar.css';
import Collapse from 'flowbite/lib/esm/components/collapse';
import axios from 'axios';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../shadcn/hover-card";

import { Button } from "../Button/button";

const Navbar = ({customer}) => {
  const [shoppingList, setShoppingList] = useState()
  const targetElRef = useRef(null);
  const triggerElRef = useRef(null);

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
  useEffect(() => {
    const options = {
      onCollapse: () => {
        console.log('element has been collapsed');
      },
      onExpand: () => {
        console.log('element has been expanded');
      },
      onToggle: () => {
        console.log('element has been toggled');
      }
    };
  
    const collapse = new Collapse(targetElRef.current, triggerElRef.current, options);

  
    // Clean up the event listeners when the component is unmounted
    return () => {
      /* collapse.destroy(); */
    };
  }, []);

  console.log("shoppingList:", shoppingList?.cart?.items?.length )

  return (
    
<nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="http://localhost:5173" class="flex items-center">
        <img src="https://i.ibb.co/2h36knH/logo.jpg" class="h-16 mr-3" alt="Emazing Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false" ref={triggerElRef}>
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default" ref={targetElRef}>
      <ul class="font-medium  flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <Link to="/" className="navigation-link text-black">
            Home
          </Link>
          <Link to="/blog" className="navigation-link text-black">
            Blog
          </Link>
          <Link to="/shop" className="navigation-link text-black">
            Shop
          </Link>
          <Link to="/about" className="navigation-link text-black">
            About
          </Link>
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
    </div>
  </div>
</nav>



    /* <nav className="navigation-bar" style={{ fontFamily: 'Varela, sans-serif' }}>
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
    </nav> */
  );
}

export default Navbar;

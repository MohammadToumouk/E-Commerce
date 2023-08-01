import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar/navbar.css';

import axios from 'axios';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../shadcn/hover-card";

import { Button } from "../Button/button";
import { LogOutIcon, UserIcon, XIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadcn/dropdown-menu";


const Navbar = ({customer, shoppingList}) => {
       
    const calculateTotalBalance = () => {
      let totalBalance = 0;
      shoppingList?.cart?.items?.forEach((item) => {
        totalBalance += item.price * item.quantity;
      });
      return totalBalance;
    };

    const handleRemoveFromCart = async (productId) => {
      try {
        const response = await axios.post(`http://localhost:3069/cart/remove/${productId}`,
        {
          withCredentials: true,
        },
      );
      
        console.log('Response from server:', response.data);
        //Add any further actions or notifications for successful submission here.
        toast({
          title: `${product.name} added successfully to cart`,
          description: "Friday, February 10, 2023 at 5:57 PM",
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),

        })

        fetchShoppingCart()
      } catch (error) {
        // console.error('Error while submitting:', error);// Add error handling or notifications for failed submissions here.
        // console.log("DataWithError", values)
        console.log("Error", error)
      }
      // console.log("testData", values)
    }


  return (
    <nav className="navigation-bar" style={{ fontFamily: 'Varela, sans-serif' }}>
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
          <HoverCardContent className="w-full h-full">
            <h1 className="shopping-cart" >Shopping Cart</h1>
            {shoppingList?.cart?.items?.length === 0 ? (
              <div className="shopping-cart-empty">Your cart is empty</div> ) : (
                <>
              {shoppingList?.cart?.items?.map((item) => (
                
                <div className="shopping-cart-item-container" key={item._id}>
                  <div className="shopping-cart-item" >
                    <img 
                      src={item.images}
                      alt="Product"
                      className='shopping-cart-product-image'
                    />
                    <div>
                    <div className="shopping-cart-product-name">{item.product.name}</div>
                  <div className="shopping-cart-product-price">{item.color}{"   $"}{item.price * item.quantity}</div>
                    </div>
                    <div className="shopping-cart-quantity">
                      {item.quantity} 
                    {/* <input 
                      type="number"
                      className='shopping-cart-quantity-input'
                      min="1"
                      placeholder={item.quantity}
                      onChange={(event) => handleQuantityChange(event, item.product._id)}
                    /> */}
                  </div>
                   <XIcon 
                      className="shopping-cart-trash-icon text-red-600 cursor-pointer"
                      style={{ width: '15px', height: '15px' }}
                      onClick={() => handleRemoveFromCart( item.product._id)}
                   />
                  </div>
                </div>
                ))
              }
              <div className="shopping-cart-total">
                <div className="shopping-cart-total-price">Total: </div>
                <div className="shopping-cart-total-price">{"$ "}{calculateTotalBalance()}</div>
              </div>
            <Button variant="ghost" className="w-full">View Cart</Button>
            </>
            )}
            <Button className="w-full">Checkout</Button>
          </HoverCardContent>
        </HoverCard>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger className="login ml-5">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQCX5_wYEa6hyWoqSBOaPbaHw5Ff8Ljp0WcA&usqp=CAU"
              alt="Login"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to="/login" className="login">
              <DropdownMenuItem>
                <UserIcon className="mr-2" />
                Profile
              </DropdownMenuItem>
            </Link>
            <Link to="/login" className="login">
            <DropdownMenuItem>
              <LogOutIcon className="mr-2" />
              Logout
            </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
        

        </div>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

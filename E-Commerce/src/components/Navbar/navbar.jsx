import { Link } from 'react-router-dom';
import '../Navbar/navbar.css';
import Collapse from 'flowbite/lib/esm/components/collapse';
import axios from 'axios';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../shadcn/hover-card";
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "../Button/button";
import { LogOutIcon, UserIcon, XIcon } from 'lucide-react';

import { useToast } from "../shadcn/use-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadcn/dropdown-menu";
import { useState,useEffect,useRef } from 'react';




const stripePromise = loadStripe('pk_test_51N2Y22KydIDbyPlEkUYJimKUkEtYf7AJD0ef5XZ5JPRbdJjsrFnKTcgDK0rw3yIT2LJK4LnLzhNXz6NF9VNwGyTn00GEMHCqtJ');
const secretkey = "sk_test_51N2Y22KydIDbyPlEtk5uN1TDRkv0gMH3o7RiafTXgF2YoUWZUzkp01HhHb6SjTb4qWa77iukwfyMKleYcdDV84xw00TBDzokiB";


const Navbar = ({customer, shoppingList, setShoppingList}) => {
  const { toast } = useToast()
  
  const targetElRef = useRef(null);
  const triggerElRef = useRef(null);

       
    const calculateTotalBalance = () => {
      let totalBalance = 0;
      shoppingList?.cart?.items?.forEach((item) => {
        totalBalance += item.price * item.quantity;
      });
      return totalBalance;
    };

    const handleLogout = async () => {
      await axios.post( 'http://localhost:3069/customer/logout',{headers: {"Cookie": ""}}, {withCredentials: true })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
  
      window.location.href = "/shop"
    }

    const [shoppingCart, setShoppingCart] = useState();

    const fetchShoppingCart = async () => {
      await axios
        .get("http://localhost:3069/cart", { withCredentials: true })
        .then((response) => {
          setShoppingCart(response.data);
          console.log(shoppingCart?.cart?.items);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    useEffect(() => {
      
      fetchShoppingCart();
    }, []);
  
  

    const handleRemoveFromCart = async (productId, name) => {
      try {
        const response = await axios.delete(`http://localhost:3069/cart/remove/${productId}`,
        {
          withCredentials: true,
        },
      );

        console.log('Response from server:', response.data);
        //Add any further actions or notifications for successful submission here.

        setShoppingList({cart: response.data.cart})

        toast({
          title: `${name} successfully removed from cart`,
          // action: (
          //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          // ),

        })

        fetchShoppingCart()
      } catch (error) {
        // console.error('Error while submitting:', error);// Add error handling or notifications for failed submissions here.
        // console.log("DataWithError", values)
        console.log("Error", error)
      }
      // console.log("testData", values)
    }

    const handleCheckOut = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3069/stripe/checkout/create-checkout-session",
          {
            shoppingCart: {
              cart: { items: shoppingCart?.cart?.items, _id: shoppingCart?.cart?._id },
            },
          },
          {
            headers: {
              'Authorization': `Bearer ${secretkey}`,
              'Content-Type': 'application/json', 
            },
            withCredentials: true,
          }
        );
    
        const data = response.data;
        const stripeSessionUrl = data.url;
        await  fetchShoppingCart();
    
        // Redirect the user to the Stripe Checkout page
      //  window.location.reload();
        window.location.href = stripeSessionUrl;
       
      } catch (err) {
        console.error(err.message);
      }
    };



  return (
    
<nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="http://localhost:5174" className="flex items-center">
        <img src="https://i.ibb.co/2h36knH/logo.jpg" className="h-16 mr-3" alt="Emazing Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false" ref={triggerElRef}>
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default" ref={targetElRef}>
      <ul className="font-medium  flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
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
                    <div className="shopping-cart-product-name">{item.name}</div>
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

                      onClick={() => handleRemoveFromCart( item.product?._id || item.product, item.name)}

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
            <Button className="w-full" onClick={handleCheckOut}>Checkout</Button>
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
            <Link to="/myprofile" className="login">
              <DropdownMenuItem>
                <UserIcon className="mr-2" />
                Profile
              </DropdownMenuItem>
            </Link>
            <Link to="/login" className="login">
            <div onClick={handleLogout}>
            <DropdownMenuItem>
              <LogOutIcon className="mr-2"  />
              Logout
            </DropdownMenuItem>
            </div>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
        )}
      
      </ul>
    </div>
  </div>
</nav>
);
}

export default Navbar;

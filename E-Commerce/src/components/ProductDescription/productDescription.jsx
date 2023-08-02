import React, { useState } from 'react';
import './ProductDescription.css';

import axios from 'axios';

import { Button } from '../Button/button';
import { ToastAction } from "../shadcn/toast"
import { useToast } from "../shadcn/use-toast"
import { useInView } from 'react-intersection-observer';
const ProductDescription = ({ product, setShoppingList, shoppingList }) => {
  const { toast } = useToast()

  const { id, name, description, price, image, additionalImages, quantity, color, sizes } = product;

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1); // Default quantity is set to 1
  const [ref, inView] = useInView({
    triggerOnce: true, // The fade-in animation will be triggered only once when the component enters the viewport
    threshold: 0.1, // Percentage of component visibility required to trigger the animation
  });

  // console.log("setShoppingListPD", setShoppingList)
  // console.log("shoppingList", shoppingList)

 
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (event) => {
    setSelectedQuantity(parseInt(event.target.value));
  };

  const uniqueColors = new Set(color);

  //onsole.log("product", product)

  const handleAddToCart = async () => {
    try {
      const response = await axios.post('http://localhost:3069/cart/add', {
        productId: product._id,
        brand: product.brand,
        name: product.name,
        images: product.images[0],
        quantity: selectedQuantity,
        price: price * selectedQuantity,
        category: product.category,
        description: product.description,
        size: selectedSize,
        color: selectedColor,
      },
      {
        withCredentials: true,
      },
       {
        headers: {
          'Content-Type': 'application/json',
        },
      });
        console.log('Response from server:', response.data);
        // Add any further actions or notifications for successful submission here.

        setShoppingList({cart: response.data.cart})

        // setShoppingList((data) => {
        //   console.log("data", data)
        //   return { cart: {...data.cart, items: [...data.cart.items, response.data]}}


        // })
        toast({
          title: `${product.name} added successfully to cart`,
          //description: "Friday, February 10, 2023 at 5:57 PM",
          // action: (
          //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          // ),
        })

        console.log("Data", response.data)
      } catch (error) {
        // console.error('Error while submitting:', error);// Add error handling or notifications for failed submissions here.
        // console.log("DataWithError", values)
        console.log("Error", error)
      }

      // console.log("testData", values)
  }

  return (
    <div ref={ref} className={`product-description fade-in ${inView ? 'visible' : ''}`} >
      <h2>{name}</h2>
      <div className="divider"></div>

      {/* Sizes */}
      {Array.isArray(sizes) && sizes.length > 0 && (
        <div className="product-sizes">
          <p>Sizes:</p>
          <div className="size-options">
            {sizes.map((size, index) => (
              <button
                key={index}
                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => handleSizeChange(size)}
              >
                {size}
              </button>
            ))}
          </div>
          <div className="divider"></div>
        </div>
      )}

      <p>{description}</p>
      <div className="divider"></div>

      {/* Color Options */}
      {Array.isArray(color) && color.length > 0 && (
        <div className="color-picker">
          <p>Choose Color:</p>
          <div className="color-options">
            {[...uniqueColors].map((colorOption, index) => (
              <div
                key={index}
                className={`color-option ${selectedColor === colorOption ? 'selected' : ''}`}
                style={{ backgroundColor: colorOption }}
                onClick={() => handleColorChange(colorOption)}
              ></div>
            ))}
          </div>
        </div>
      )}
      <div className="divider"></div>

      {/* Quantity Picker */}
      <div className="quantity-picker">
        <p>Choose Quantity:</p>
        <input
          type="number"
          min="1"
          max={quantity}
          value={selectedQuantity}
          onChange={handleQuantityChange}
        />
      </div>
      <div className="divider"></div>

      <p>Price: {price * selectedQuantity} EUR</p>

      {/* Add to Cart Button */}
      {quantity > 0 ? (
        <div className="add-to-cart-container">
          <Button disabled={selectedColor ? false : true} className="add-to-cart-button" onClick={handleAddToCart}  >Add to Cart</Button>
        </div>
      ) : (
        <div className="sold-out-container">
          <div className="sold-out-text">Sold Out</div>
        </div>
      )}

      {/* Availability */}
      <div className="availability">
        <span className={quantity > 0 ? 'checkmark' : 'x-symbol'}>{quantity > 0 ? '✅' : '❌'}</span>
        <span className="availability-text">
          {quantity > 0 ? 'In Stock. Delivery in 3-5 working days.' : 'Out of stock'}
        </span>
      </div>

      <div className="delivery-info">
        <span className="delivery-symbol">🚚</span>
        <span className="delivery-text">
          {quantity > 0 ? 'Free Delivery' : 'No Delivery Available'}
        </span>
      </div>
    </div>
  );
};

export default ProductDescription;

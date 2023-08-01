// Card.jsx
import React, { useState } from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import { Button } from '../Button/button';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Card = ({ available, imageSrc, productName, price, color, currency, productId, style }) => {
  const [selectedColor, setSelectedColor] = useState(color);
  const [product, setPruduct] = useState("62b9b6b9e6b0e0a9b8f0e0a9");
  const [quantity, setQuantity] = useState(1);

  // console.log("productId", imageSrc)

  // // const cartItem = {
  // //   productId: "64b534db6c1263f6e04686b7",
  // //   quantity: 23,
  // // }

  // const handleAddToCart = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:3069/cart/add', {
        
  //       productId: productId,
  //       productName: productName,
  //       images: imageSrc,
  //       quantity: quantity,
  //       price: price,
  //     },
  //     {
  //       withCredentials: true,
  //     },
  //      {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //       console.log('Response from server:', response.data);
  //       // Add any further actions or notifications for successful submission here.
  //     } catch (error) {
  //       // console.error('Error while submitting:', error);// Add error handling or notifications for failed submissions here.
  //       // console.log("DataWithError", values)
  //       console.log("Error", error)
  //     }

  //     // console.log("testData", values)
  // }
  

  return (
    <div className="card" style={style}>
      {available ? (
        <div className="badge" style={{ backgroundColor: 'green' }}>
          Available
        </div>
      ) : (
        <div className="badge" style={{ backgroundColor: 'red' }}>
          Sold Out
        </div>
      )}
      <div className="image-wrapper">
        <img src={imageSrc} alt="Product" className="product-image" />
      </div>
 
      <div className="details">
        <div className="product-name">{productName}</div>
        <div className="product-price">{currency}{price}</div>
      </div>
      <div className="buttons">
        <Link to={`/shop/${productId}`} className="details-button">
          Details
        </Link>
        {available && (
          <NavLink to={`/shop/${productId}`} className="add-to-cart" >
            <Button>
              Buy
            </Button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Card;

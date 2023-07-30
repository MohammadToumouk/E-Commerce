// Card.jsx
import React, { useState } from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import { Button } from '../Button/button';
import axios from 'axios';

const Card = ({ available, imageSrc, productName, price, color, currency, productId }) => {
  const [selectedColor, setSelectedColor] = useState(color);

  const handleAddToCart = (values) => {
    // try {
    //   const response = await axios.post('http://localhost:3069/cart/add', {
    //     customerId: values.customerId,
    //     productId: values.productId,
    //   }, {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //   });

    //     console.log('Response from server:', response.data);
    //     // Add any further actions or notifications for successful submission here.
    //   } catch (error) {
    //     console.error('Error while submitting:', error);// Add error handling or notifications for failed submissions here.
    //     console.log("DataWithError", values)
    //     console.log("Error", error)
    //   }

    //   console.log("testData", values)
    // }
  };

  return (
    <div className="card">
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
          <Button onClick={(e) => handleAddToCart(e)}>
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default Card;

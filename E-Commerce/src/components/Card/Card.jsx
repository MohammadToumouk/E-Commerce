// Card.jsx
import React, { useState } from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import { Button } from '../Button/button';

const Card = ({ available, imageSrc, productName, price, color, currency, productId }) => {
  const [selectedColor, setSelectedColor] = useState(color);

  const handleAddToCart = () => {
    // Implement your add to cart logic here
    alert('Added to Cart!');
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
      <div className="color-text" style={{ color: 'black' }}>
        {selectedColor}
      </div>
      <div className="details">
        <div className="product-name">{productName}</div>
        <div className="product-price">{currency}{price}</div>
      </div>
      <div className="buttons">
        {available && (
          <Button className="buy-now-button" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        )}
        <Link to={`/shop/${productId}`} className="details-button">
          Details
        </Link>
      </div>
    </div>
  );
};

export default Card;

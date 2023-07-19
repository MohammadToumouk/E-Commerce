import React, { useState } from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

const Card = ({ available, imageSrc, productName, price, color, currency, productId }) => {
  const [selectedColor, setSelectedColor] = useState(color);

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
        {available && <button className="buy-now-button">BUY NOW</button>}
        <Link to={`/shop/${productId}`} className="details-button">
          Details
        </Link>
      </div>
    </div>
  );
};

export default Card;

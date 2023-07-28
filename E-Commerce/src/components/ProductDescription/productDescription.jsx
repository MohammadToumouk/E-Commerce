import React, { useState } from 'react';
import './ProductDescription.css';

const ProductDescription = ({ product }) => {
  const { name, description, price, image, additionalImages, quantity, color } = product;

  const [selectedColor, setSelectedColor] = useState('');

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  // Convert the color array to a set to remove duplicates
  const uniqueColors = new Set(color);

  return (
    <div className="product-description">
      <h2>{name}</h2>
      <div className="divider"></div>
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

      <p>Price: {price} EUR</p>

      {/* Add to Cart Button */}
      {quantity > 0 ? (
        <div className="add-to-cart-container">
          <button className="add-to-cart-button">Add to Cart</button>
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
        <span className="delivery-text">{quantity > 0 ? 'Free Delivery' : 'No Delivery Available'}</span>
      </div>
    </div>
  );
};

export default ProductDescription;

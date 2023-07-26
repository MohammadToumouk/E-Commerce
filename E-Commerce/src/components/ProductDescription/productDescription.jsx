import React, { useState } from 'react';
import './ProductDescription.css';

const ProductDescription = ({ product }) => {
  const { name, description, price, image, additionalImages, quantity } = product;

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  // Replace this with the correct data from 'availableColors' when available
  const filteredAvailableColors = [];

  // Replace this with the correct data from 'availableSizes' when available
  const filteredAvailableSizes = [];

  return (
    <div className="product-description">
      <h2>{name}</h2>
      <div className="divider"></div>
      <p>{description}</p>
      <div className="divider"></div>

      {/* Color Options */}
      {filteredAvailableColors.length > 0 && (
        <div className="color-picker">
          <p>Choose Color:</p>
          <div className="color-options">
            {filteredAvailableColors.map((color, index) => (
              <div
                key={index}
                className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
              ></div>
            ))}
          </div>
        </div>
      )}
      <div className="divider"></div>

      {/* Size Options */}
      {filteredAvailableSizes.length > 0 && (
        <div className="size-picker">
          <p>Choose Size:</p>
          <div className="size-options">
            {filteredAvailableSizes.map((size, index) => (
              <div
                key={index}
                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => handleSizeChange(size)}
              >
                {size}
              </div>
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

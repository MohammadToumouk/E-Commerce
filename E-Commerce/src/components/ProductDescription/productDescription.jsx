import React, { useState } from 'react';
import './ProductDescription.css'; 

const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];

const ProductDescription = ({ productName, description, price, available, availableColors, availableSizes, filters,
  setFilters, filteredProducts, }) => {
  const [selectedColor, setSelectedColor] = useState(
    availableColors.find((color) => color.available)?.color || ''
  );
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]); 

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const filteredAvailableColors = availableColors.filter((color) => color.color !== selectedColor);

  return (
    <div className="product-description">
      <h2>{productName}</h2>
      <div className="divider"></div>
      <p>{description}</p>
      <div className="divider"></div>

      <div className="size-picker">
        <p>Choose Size:</p>
        <div className="size-options">
          {availableSizes.map((size, index) => (
            <div
              key={index}
              className={`size-option ${selectedSize === size.name ? 'selected' : ''}`}
              onClick={() => handleSizeChange(size.name)}
            >
              {size.name}
            </div>
          ))}
        </div>
      </div>
      <div className="divider"></div>

      {availableColors.length > 0 && (
        <div className="color-picker">
          <p>Choose Color:</p>
          <div className="color-options">
            {availableColors.map((color, index) => (
              <div
                key={index}
                className={`color-option ${selectedColor === color.color ? 'selected' : ''}`}
                style={{ backgroundColor: color.color }}
                onClick={() => handleColorChange(color.color)}
              ></div>
            ))}
          </div>
        </div>
      )}
      <div className="divider"></div>

      <p>Price: {price} EUR</p>

      <div className="add-to-cart-container">
        <button
          className={`add-to-cart-button ${available ? 'available' : 'not-available'}`}
          disabled={!available}
        >
          {available ? 'Add to Cart' : 'Not Available'}
        </button>
      </div>
      {available ? (
        <div className="availability">
          <span className="checkmark">&#9989;</span>
          <span className="availability-text">In Stock. Delivery in 3-5 working days.</span>
        </div>
      ) : (
        <div className="availability">
          <span className="x-mark">&#10008;</span>
          <span className="availability-text">Out of Stock</span>
        </div>
      )}

      <div className="delivery-info">
        <span className="delivery-symbol">🚚</span> {/* Delivery truck symbol */}
        <span className="delivery-text">{available ? 'Free Delivery' : 'Delivery Not Possible'}</span>
      </div>
    </div>
  );
};


export default ProductDescription;

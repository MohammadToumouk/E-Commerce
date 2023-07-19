import React from 'react';
import './Card.css';

const Card = ({ available, imageSrc, productName, price, color, currency }) => {
  const [selectedColor, setSelectedColor] = React.useState('black');

  return (
    <div className="card">
      {available ? (
        <div className="badge available">Available</div>
      ) : (
        <div className="badge sold-out">Sold Out</div>
      )}
      <div className="image-wrapper">
        <img src={imageSrc} alt="Product" className="product-image" />
      </div>
      <div className="color-text" style={{ color: selectedColor }}>
        {color}
      </div>
      <div className="details">
        <div className="product-name">{productName}</div>
        <div className="product-price">{currency}{price}</div>
      </div>
      <div className="buttons">
        {available && ( 
          <button className="buy-now-button">BUY NOW</button>
        )}
        <button className="details-button">Details</button>
      </div>
    </div>
  );
};

export default Card;

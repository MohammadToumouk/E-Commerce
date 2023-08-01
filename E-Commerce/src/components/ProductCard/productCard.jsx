import React from 'react';

const ProductCard = ({ available, imageSrc, productName, price, color, currency, productId }) => {
  return (
    <div className="product-card">
      <img src={imageSrc} alt={productName} />
      <div className="product-info">
               {available && (
          <div className="buttons">
            <button className="buy-now-button">BUY NOW</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

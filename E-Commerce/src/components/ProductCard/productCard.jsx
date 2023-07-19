import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ available, imageSrc, productName, price, color, currency, productId }) => {
  return (
    <div className="product-card">
      <img src={imageSrc} alt={productName} />
      <h3>{productName}</h3>
      <p>{price} {currency}</p>
      {available && (
        <div className="buttons">
          <button className="buy-now-button">BUY NOW</button>
          {/* <Link to={`/shop/${productId}`} className="details-button">
            Details
          </Link> */}
        </div>
      )}
    </div>
  );
};

export default ProductCard;

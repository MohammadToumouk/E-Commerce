import React from 'react';

const ProductDescription = ({ productName, description, price }) => {
  return (
    <div className="product-description">
      <h2>{productName}</h2>
      <p>{description}</p>
      <p>${price}</p>
    </div>
  );
};

export default ProductDescription;

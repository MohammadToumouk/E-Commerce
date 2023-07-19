import React from 'react';
import './ProductPage.css';


const ProductPage = () => {
    return (
      <div className="shop-page">
        {cardData.map((card) => (
          <div key={card.id} className="card-container">
            <Card
              available={card.available}
              imageSrc={card.imageSrc}
              productName={card.productName}
              price={card.price}
              color={card.color}
              currency="€"
            />
          </div>
        ))}
      </div>
    );
  };
  
  export default ProductPage;
  
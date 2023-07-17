import React, { useState } from 'react';
import './Card.css';

const Card = () => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="shop-page">
      <div className="card">
        <div className="image-wrapper">
          <div className="actions">

          </div>
          <div className="availability">
            <span className="badge">Available</span>
          </div>
        </div>
        <div className="details">
          <p className="brand">Hammond Robotics</p>
          <h1 className="item-name">Item Name</h1>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            lobortis imperdiet diam, sit amet scelerisque justo fermentum
            vitae. In finibus consectetur tortor eu condimentum.
          </p>
          <p className="price">€1299</p>
          <p className="category">Category: Electronics</p>
          <div className="quantity">
            <button className="button-test" onClick={handleDecrease}>
              <img className="svg1" src="https://www.pngall.com/wp-content/uploads/5/Minus.png">
              </img>
            </button>
            <div className="count">{quantity}</div>
            <button onClick={handleIncrease}>
              <img className="svg2" src="https://www.citypng.com/public/uploads/preview/transparent-hd-add-insert-black-icon-symbol-116396096954cp1y6h7p5.png">
         
              </img>
            </button>
          </div>
          <button className="add-to-order">
            Add to order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

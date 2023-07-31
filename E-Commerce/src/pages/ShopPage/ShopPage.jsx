
import React, { useState, useEffect } from 'react';
import './ShopPage.css';
import Sidebar from '../../components/sidebar/sidebar';
import Card from '../../components/Card/Card';

const ShopPage = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3069/product/')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="shop-page">
      <Sidebar setFilteredProducts={setFilteredProducts} products={products} />

      <div className="card-container">
        {filteredProducts.map((product) => (
          <Card
            key={product._id}
            available={product.quantity > 0}
            imageSrc={product.images[0]} 
            productName={product.name}
            price={product.price}
            color={product.color}
            currency="€"
            productId={product._id}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;

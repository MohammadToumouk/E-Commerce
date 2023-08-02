
import React, { useState, useEffect } from 'react';
import './ShopPage.css';
import Sidebar from '../../components/sidebar/sidebar';
import Card from '../../components/Card/Card';

import axios from 'axios';

const baseUrl = import.meta.env.VITE_BACKEND_URL

const ShopPage = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get((baseUrl || "") + '/api/product/');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();

        // fetch((baseUrl || "") + '/api/product/')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setProducts(data.products);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data:', error);
    //   });
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

import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/productCard';
import ProductDescription from '../../components/ProductDescription/productDescription';
import './ProductPage.css';

const ProductPage = ({setShoppingList, shoppingList}) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3069/product/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProduct(data.product);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <Navigate to="/shop" />;
  
  }

  // Ensure that the properties exist in the product object
  const { images, color, price, sizes } = product;
  //const additionalImages = product.additionalImages || [];

  return (
    <div className="content">
      <div className="product-page">
        <div className="product-image-container">
          <div className="product-card main-image">
            <ProductCard imageSrc={images} color={color} price={price} currency="€" />
          </div>
          <div className="additional-images">
            {product?.additionalImages?.map((imgSrc, index) => (
              <div className="product-card" key={index}>
                <ProductCard imageSrc={imgSrc} />
              </div>
            ))}
          </div>
        </div>
        <div className="product-description-container">
          <ProductDescription product={product} sizes={sizes} setShoppingList={setShoppingList} shoppingList={shoppingList} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

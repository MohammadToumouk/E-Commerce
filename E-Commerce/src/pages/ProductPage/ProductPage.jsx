import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/productCard';
import ProductDescription from '../../components/ProductDescription/productDescription';
import './ProductPage.css'; 
import Sidebar from '../../components/sidebar/sidebar';

const cardData2 = [
  {
    id: 1,
    category: 'Mobile Phones',
    brand: 'Apple',
    colorOptions: [
      { name: 'Red', color: '#ff0000', available: true },
      { name: 'Blue', color: '#0000ff', available: true },
      { name: 'Green', color: '#00ff00', available: false },
      { name: 'Orange', color: '#ffa500', available: true },
    
    ],
    available: true,
    imageSrc: 'https://images.unsplash.com/photo-1611472173362-3f53dbd65d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=704&q=80',
    productName: 'Iphone 13',
    price: '199.99',
    description: "The iPhone 13 is the latest iteration of Apple's renowned smartphone series. It boasts a sleek and premium design, featuring a vibrant Super Retina XDR display. Powered by Apple's latest A15 Bionic chip, the iPhone 13 delivers lightning-fast performance and improved energy efficiency. The device comes with an impressive dual-camera system with advanced computational photography capabilities, allowing users to capture stunning photos and videos even in challenging lighting conditions. Night mode and Deep Fusion enhance low-light and detail-rich shots. Apple has further improved battery life, ensuring extended usage time on a single charge. The iPhone 13 supports 5G connectivity, providing faster download speeds and improved network performance. Additionally, the iPhone 13 offers enhanced water and dust resistance, keeping the device protected from everyday mishaps. Users can choose from a range of storage capacities and elegant color options to suit their personal preferences. Overall, the iPhone 13 continues to exemplify Apple's commitment to innovation, delivering an exceptional and seamless user experience.",
    sizeOptions: [
      { name: 'S', available: true},
      { name: 'M', available: true},
      { name: 'L', available: false},
      { name: 'XL', available: true},
      { name: 'XXL', available: true},
      
    ],
    additionalImages: [
      'https://images.unsplash.com/photo-1632582593957-e28f748ba619?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1581795669633-91ef7c9699a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      // Add more additional image URLs for this product
    ],
  },
  {
    id: 2,
    category: 'Accessories',
    brand: 'Sony',
    colorOptions: [
      { name: 'Red', color: '#ff0000', available: true },
      { name: 'Blue', color: '#0000ff', available: false },
      { name: 'Green', color: '#00ff00', available: true },
      { name: 'Orange', color: '#ffa500', available: true },
    ],
    available: false,
    imageSrc: 'https://www.citypng.com/public/uploads/preview/hd-iphone-14-plus-on-hand-png-11662584403c9s4nmb2mr.png',
    productName: 'Iphone 13 (Blue)',
    price: '499.99',
    description: 'Description for Iphone 13 (Blue)',
    sizeOptions: [
      { name: 'S', available: true},
      { name: 'M', available: true},
      { name: 'L', available: false},
      { name: 'XL', available: true},
      
    ],
    additionalImages: [
      'https://www.citypng.com/public/uploads/preview/apple-iphone-14-on-hand-hd-png-11662584808frfwpah4pe.png',
      'https://www.citypng.com/public/uploads/preview/hd-iphone-14-plus-on-hand-mockup-png-11662584692jzzpfopuka.png',
      'https://www.citypng.com/public/uploads/preview/hd-iphone-14-pro-max-deep-purple-mockup-png-11662587967wqttbqr67j.png'
    ],
  },
      {
        id: 3,
        category: 'Mobile Phones',
        brand: 'Huawei',
        colorOptions: [
          { name: 'Red', color: '#ff0000', available: true },
          { name: 'Blue', color: '#0000ff', available: true },
          { name: 'Green', color: '#00ff00', available: true },
          { name: 'Orange', color: '#ffa500', available: true },
          { name: 'Purple', color: '#6600FF', available: true },
        ],
        available: true,
        imageSrc: 'https://www.citypng.com/public/uploads/preview/apple-iphone-14-pro-max-silver-mockup-free-png-11662640711kfi4yhf5qu.png',
        productName: 'Iphone 13 (Red)',
        price: '199.99',
        description: 'Description for Iphone 13 (green)',
        sizeOptions: [
          { name: 'S', available: true},
          { name: 'M', available: true},
          { name: 'L', available: false},
          { name: 'XL', available: true},
          { name: 'XXL', available: true},
          
          
        ],
        additionalImages: [
          'https://www.citypng.com/public/uploads/preview/hand-holding-smartphone-iphone-mockup-png-11664668285rox5edzkxi.png',
          'https://www.citypng.com/public/uploads/preview/hand-holding-smartphone-iphone-mockup-png-11664668285rox5edzkxi.png',
          // Add more additional image URLs for this product
        ],
      },

      {
        id: 4,
        category: 'Tablets',
        brand: 'Samsung',
        colorOptions: [
          { name: 'Red', color: '#ff0000', available: false },
          { name: 'Blue', color: '#0000ff', available: false },
          { name: 'Green', color: '#00ff00', available: true },
          { name: 'Orange', color: '#ffa500', available: true },
        ],
        available: false,
        imageSrc: 'https://www.citypng.com/public/uploads/preview/apple-iphone-14-pro-max-gold-mockup-hd-png-11662640469npxog2xjsl.png',
        productName: 'Iphone 13 (Blue)',
        price: '499.99',
        description: 'Description for Iphone 13 (white)',
        sizeOptions: [
          { name: 'S', available: false},
          { name: 'M', available: true},
          { name: 'L', available: false},
          { name: 'XL', available: true},
          
        ],
        additionalImages: [
          'https://www.citypng.com/public/uploads/preview/apple-iphone-14-pro-max-gold-mockup-hd-png-11662640469npxog2xjsl.png',
          'https://www.citypng.com/public/uploads/preview/apple-iphone-14-pro-max-gold-mockup-hd-png-11662640469npxog2xjsl.png',
          'https://www.citypng.com/public/uploads/preview/apple-iphone-14-pro-max-gold-mockup-hd-png-11662640469npxog2xjsl.png',
],
      },

    ]

    const ProductPage = () => {
      const { id } = useParams();
      const product = cardData2.find((card) => card.id === Number(id));
      const availableColors = product.colorOptions.filter((color) => color.available);
      const availableSizes = product.sizeOptions.filter((size) => size.available);
      
      
    
      if (!product) {
        return <Redirect to="/shop" />;
      }
    
      return (
        <div className="content">
          <div className="product-page">
            <div className="product-image-container">
              <div className="product-card main-image">
                <ProductCard imageSrc={product.imageSrc} color={product.color} price={product.price} currency="€" />
              </div>
              <div className="additional-images">
                {product.additionalImages.map((imgSrc, index) => (
                  <div className="product-card" key={index}>
                    <ProductCard imageSrc={imgSrc} />
                  </div>
                ))}
              </div>
            </div>
            <div className="product-description-container">
              <ProductDescription
                productName={product.productName}
                description={product.description}
                price={product.price}
                currency="€"
                available={product.available}
                availableColors={availableColors}
                availableSizes={availableSizes} 
                
              />
            </div>
          </div>
        </div>
      );
    };
    
    export default ProductPage;
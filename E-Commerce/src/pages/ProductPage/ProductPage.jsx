import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/productCard';
import ProductDescription from '../../components/ProductDescription/productDescription';


const cardData2 = [
    {
      id: 1,
      color: 'red',
      available: true,
      imageSrc: 'https://www.citypng.com/public/uploads/preview/iphone-14-pro-and-max-deep-purple-png-11662587434zacaxkb4sd.png',
      productName: 'Iphone 13',
      price: '199.99',
    },
    {
      id: 2,
      color: 'blue',
      available: false,
      imageSrc: 'https://www.citypng.com/public/uploads/preview/iphone-14-pro-and-max-deep-purple-png-11662587434zacaxkb4sd.png',
      productName: 'Iphone 13',
      price: '499.99',
    },
    {
      id: 3,
      color: 'black',
      available: true,
      imageSrc: 'https://www.citypng.com/public/uploads/preview/iphone-14-pro-and-max-deep-purple-png-11662587434zacaxkb4sd.png',
      productName: 'Iphone 13',
      price: '499.99',
    },
    {
      id: 4,
      color: 'purple',
      available: true,
      imageSrc: 'https://www.citypng.com/public/uploads/preview/iphone-14-pro-and-max-deep-purple-png-11662587434zacaxkb4sd.png',
      productName: 'Iphone 13',
      price: '499.99',
    },
  ];

const ProductPage = ({ cardData }) => {
  const { id } = useParams(); 

//   console.log(cardData2)
  const product = cardData2.find((card) => card.id === Number(id));
  console.log(product)
//   if (!product) {
  
//     return <Redirect to="/shop" />;
//   }

  return (
    <div className="product-page">
      <ProductCard price={product.price}
                productName={product.productName} 
                imageSrc={product.imageSrc}/>
      <ProductDescription
        productName={product.productName}
        description={product.description}
        price={product.price}
      />
    </div>
  );
};

export default ProductPage;

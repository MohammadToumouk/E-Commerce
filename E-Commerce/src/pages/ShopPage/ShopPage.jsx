import { Link } from 'react-router-dom';
import React from 'react';
import './ShopPage.css';
import Card from '../../components/card/card';




const cardData = [
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

const ShopPage = () => {
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
            productId={card.id} 
          />
        </div>
      ))}
    </div>
  );
};

export default ShopPage;
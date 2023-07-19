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
      description: 'Die Polar Ignite ist eine wasserdichte Fitnessuhr mit optischer Pulsmessung am Handgelenk und integriertem GPS. Die Fitnessuhr ist dein Trainingspartner der neuen Generation und hilft dir, dein wahres Potenzial zu entdecken und auf intelligente Weise neue Bestleistungen zu erreichen. Die Polar Ignite bietet dir eine ganzheitliche Übersicht deines Tages und bringt dich einer ausgewogeneren Lebensweise näher.',
      size: 'S',
    
    },
    {
      id: 2,
      color: 'blue',
      available: false,
      imageSrc: 'https://www.citypng.com/public/uploads/preview/iphone-14-pro-and-max-deep-purple-png-11662587434zacaxkb4sd.png',
      productName: 'Iphone 13',
      price: '499.99',
      description: 'Die Polar Ignite ist eine wasserdichte Fitnessuhr mit optischer Pulsmessung am Handgelenk und integriertem GPS. Die Fitnessuhr ist dein Trainingspartner der neuen Generation und hilft dir, dein wahres Potenzial zu entdecken und auf intelligente Weise neue Bestleistungen zu erreichen. Die Polar Ignite bietet dir eine ganzheitliche Übersicht deines Tages und bringt dich einer ausgewogeneren Lebensweise näher.',
      size: 'M',
    },
    {
      id: 3,
      color: 'black',
      available: true,
      imageSrc: 'https://www.citypng.com/public/uploads/preview/iphone-14-pro-and-max-deep-purple-png-11662587434zacaxkb4sd.png',
      productName: 'Iphone 13',
      price: '499.99',
      description: 'Die Polar Ignite ist eine wasserdichte Fitnessuhr mit optischer Pulsmessung am Handgelenk und integriertem GPS. Die Fitnessuhr ist dein Trainingspartner der neuen Generation und hilft dir, dein wahres Potenzial zu entdecken und auf intelligente Weise neue Bestleistungen zu erreichen. Die Polar Ignite bietet dir eine ganzheitliche Übersicht deines Tages und bringt dich einer ausgewogeneren Lebensweise näher.',
      size: 'L',
    },
    {
      id: 4,
      color: 'purple',
      available: true,
      imageSrc: 'https://www.citypng.com/public/uploads/preview/iphone-14-pro-and-max-deep-purple-png-11662587434zacaxkb4sd.png',
      productName: 'Iphone 13',
      price: '499.99',
      description: 'Die Polar Ignite ist eine wasserdichte Fitnessuhr mit optischer Pulsmessung am Handgelenk und integriertem GPS. Die Fitnessuhr ist dein Trainingspartner der neuen Generation und hilft dir, dein wahres Potenzial zu entdecken und auf intelligente Weise neue Bestleistungen zu erreichen. Die Polar Ignite bietet dir eine ganzheitliche Übersicht deines Tages und bringt dich einer ausgewogeneren Lebensweise näher.',
      size: 'xl',
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
      <ProductCard imageSrc={product.imageSrc}/>
      <ProductDescription
        productName={product.productName}
        description={product.description}
        price={product.price}
      />
    </div>
  );
};

export default ProductPage;

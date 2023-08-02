import React, { useState,useEffect } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from '../Card/Card';
import { useInView } from 'react-intersection-observer';
import '../FadeInScroll.css'
import { Link } from 'react-router-dom';



export const Featured = () => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [ref, inView] = useInView({
      triggerOnce: true, // The fade-in animation will be triggered only once when the component enters the viewport
      threshold: 0.1, // Percentage of component visibility required to trigger the animation
    });
    const cardStyle1 = {
        border: '1px solid black',
        height: '30vh',
        width: '10%',
        
      };

      
    /* const settings = {
    
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000, // Adjust this value to change the slide interval in milliseconds
        pauseOnHover: true,
      };
      const carouselStyle = {
        // Define your styles here
        width: '65%',
        margin: '0 auto',
        height: '150px',
        borderRadius: '30px',
        
      }; */

      useEffect(() => {
        fetch('http://localhost:3069/product?limit=5')
          .then((response) => response.json())
          .then((data) => {
            setProducts(data.products);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);

  return (
    <>
    
    <div ref={ref} className={`fade-in ${inView ? 'visible' : ''} flex lg:justify-center md:justify-center justify-center w-7/12  p-0 `}>
    <div 
    className='w-4/12 md:w-6/12 lg:w-8/12 border-lg min-w-[250px] min-h-[15vh] ml-8 flex flex-col gap-5 md:flex-col lg:flex-row'>
        
        {/* {products.map((product) => (
          <Card
            style={cardStyle1}
            key={product._id}
            available={product.quantity > 0}
            imageSrc={product.images[0]} 
            productName={product.name}
            price={product.price}
            color={product.color}
            currency="€"
            productId={product._id}
          />
        ))} */}
{products.map((product) => (
<div className="group my-10 flex w-full max-w-xs min-w-[250px] flex-col overflow-hidden rounded-[25px] border ml-2 gap-5 border-gray-100 bg-white shadow-md" key={product._id}>
  <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
    <img className="peer absolute top-0 right-0 h-full w-fit object-cover" src={product.images[0]}  alt="product image" />
    <img className="peer absolute top-0 -right-96 h-full w-56 object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0" src="https://wallpaperaccess.com/full/16177.jpg"  alt="product image" />
     <div className="absolute  bottom-0 mb-4 flex space-x-4 w-full justify-center">
      <div className="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div> 
      <div className="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
      <div className="rounded-full h-3 w-3 bg-gray-200 border-2 border-white"></div>
    </div> 
    <svg class="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white  transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
     {/* <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>  */}
  </a>
  <div className="mt-4 px-5 pb-5">
    <a href="#">
      <h5 className="text-xl tracking-tight text-slate-900">{product.name}</h5>
    </a>
    <div className="mt-2 mb-5 flex items-center justify-between">
      <p>
        <span className="text-3xl font-bold text-slate-900">{product.price + "€"}</span>
        {/* <span class="text-sm text-slate-900 line-through">$699</span> */}
      </p>
    </div>
    <Link to={`/shop/${product._id}`} class="flex items-center justify-center rounded-md bg-black px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
      <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      Buy</Link>
  </div>
</div>
))} 
{/* <Link to={`/shop/${productId}`} className="details-button"></Link> */}
        
      </div>
      </div>
      </>
  )
}

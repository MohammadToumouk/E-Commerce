import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@mui/material";
import { useInView } from 'react-intersection-observer';
import '../FadeInScroll.css'

const Carousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  const carouselStyle = {
    width: "65%",
    margin: "auto",
    borderRadius: "35px",
    position: "relative",
  };

  const overlayStyle = {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    color: "#fff",
  };

  const [ref, inView] = useInView({
    triggerOnce: true, // The fade-in animation will be triggered only once when the component enters the viewport
    threshold: 0.1, // Percentage of component visibility required to trigger the animation
  });

  return (
    <div ref={ref} className={`fade-in ${inView ? 'visible' : ''} ` }>
    <div style={carouselStyle} className=" justify-center  mx-auto w-10/12 md:w-10/12 lg:w-8/12 min-w-[350px] min-h-[20vh]">
      <Slider {...settings}>
        <div>
          <div className="relative">
            <img
              src="https://cdn.thewirecutter.com/wp-content/media/2023/06/appleevent-2048px-2283-3x2-1.jpg?auto=webp&quality=75&crop=1.91:1&width=1200"
              className="rounded-3xl max-h-[39rem] w-[75rem]"
            />
            <div style={overlayStyle}>
              <p className="lg:text-3xl md:text-2xl text-xs w-1/2">Step into the future with the all-new Apple Vision Goggles! Experience cutting-edge technology and explore the limitless possibilities of augmented reality with this revolutionary device.</p>

              <a href="/shop">
              <button type="button" className="bg-black text-white hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Go to Shop</button> 
            </a>

            </div>
          </div>
        </div>
        <div>
          <div className="relative">
            <img
              src="https://s31092.pcdn.co/wp-content/uploads/2020/06/PlayStation-5-reveal.jpg"
              className="rounded-3xl max-h-[39rem] w-[75rem]"
            />
            <div style={overlayStyle}>
            <p className="lg:text-3xl md:text-2xl text-xs w-1/2">Level up your gaming experience with our unbeatable deals on gaming PCs and custom-built rigs! Unlock your gaming potential and dominate the virtual world like never before.</p>
              <a href="/shop">
                <button type="button" className="bg-black text-white hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Go to Shop</button>
              </a>            
            </div>
          </div>
        </div>
      </Slider>
    </div>
    </div>
  );
};

export default Carousel;

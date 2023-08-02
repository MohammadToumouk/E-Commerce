import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import '../FadeInScroll.css'

const FadeInOnScroll = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // The fade-in animation will be triggered only once when the component enters the viewport
    threshold: 0.1, // Percentage of component visibility required to trigger the animation
  });

  return (
    <div ref={ref} className={`fade-in ${inView ? 'visible' : ''}`}>
      {children}
    </div>
  );
};

export const Banner = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <FadeInOnScroll>
      <div className=" shadow-md shadow-black w-10/12 md:w-10/12 lg:w-8/12 min-w-[360px] min-h-[20vh] border-lg flex flex-col items-center justify-center m-auto rounded-[35px] relative overflow-hidden ">
        <div className="relative">
          <img
            src='https://wallpaperaccess.com/full/745776.jpg'
            className={`w-full h-auto rounded-[35px] transition-all duration-500 ${isHovered ? 'blur' : ''}`}
            alt="Banner"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            <p className={`lg:text-4xl md:text-3xl text-2xl font-poppins font-sans text-white mb-10 transition-all duration-500 ${isHovered ? 'opacity-75' : ''}`}>
              Explore Allienware's Hottest Deals
            </p>
            <a href="/shop">
            <button
              className={`text-black bg-white px-6 py-3 font-bold rounded-lg transition-all duration-500 ${isHovered ? 'opacity-90' : ''}`}
            >
              Shop Now
            </button>
            </a>
          </div>
        </div>
      </div>
    </FadeInOnScroll>
  );
};

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const Banner2 = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true, // The fade-in animation will be triggered only once when the component enters the viewport
    threshold: 0.1, // Percentage of component visibility required to trigger the animation
  });

  return (
    <div ref={ref} className={`fade-in ${inView ? 'visible' : ''}`}>
    <div className="grid grid-cols-2 gap-4 w-8/12 border-lg m-auto rounded-[35px] overflow-hidden ">
      {/* First Banner */}
      <div
        className="relative flex flex-col items-center justify-center max-w-2xl max-h-80"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src='https://wallpapers.com/images/hd/msi-4k-white-dragon-fftvmwucujr73gjl.jpg'
          className={`w-full h-auto rounded-[35px] transition-all duration-500`}
          alt="Banner 1"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <p className={`text-4xl text-gray-400 mb-10 transition-all duration-500 ${isHovered ? 'opacity-75' : ''}`}>
            Explore MSI's Hottest Deals
          </p>
          <button
            className={`text-black bg-white px-6 py-3 font-bold rounded-lg transition-all duration-500 ${isHovered ? 'opacity-90' : ''}`}
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Second Banner */}
      <div
        className="relative flex flex-col items-center justify-center max-w-2xl max-h-80"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src='https://wallpapers.com/images/hd/green-razer-splash-art-akvfwnu1t844qxbm.jpg'
          className={`w-full h-auto rounded-[35px] transition-all duration-500`}
          alt="Banner 2"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <p className={`text-4xl text-white mb-10 transition-all duration-500 ${isHovered ? 'opacity-75' : ''}`}>
            Explore Allienware's Hottest Deals
          </p>
          <button
            className={`text-black bg-white px-6 py-3 font-bold rounded-lg transition-all duration-500 ${isHovered ? 'opacity-90' : ''}`}
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Banner2;

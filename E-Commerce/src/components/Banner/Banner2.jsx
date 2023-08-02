import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const Banner2 = () => {
  // Separate state for each banner
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5, // Adjust this value as per your preference
  });

  return (
    <div ref={ref} className={`fade-in ${inView ? 'visible' : ''}`}>
      <div className=" w-4/12 md:w-6/12 lg:w-8/12  border-lg min-w-[360px] min-h-[15vh]  flex flex-col gap-10  lg:flex-row   items-center justify-center m-auto  relative overflow-hidden">
        {/* First Banner */}
        <div
          className="relative flex flex-col items-center  justify-center max-w-2xl max-h-80 hover:scale-105 transition duration-150 ease-in-out"
          onMouseEnter={() => setIsHovered1(true)}
          onMouseLeave={() => setIsHovered1(false)}
        >
          <img
            src='https://wallpapers.com/images/hd/msi-4k-white-dragon-fftvmwucujr73gjl.jpg'
            className="w-full h-auto mx-auto  transition-all duration-500  "
            alt="Banner 1"
          />
          <div className="absolute top-0 left-0 w-full  h-full flex flex-col items-center justify-center">
            <p
              className={`lg:text-4xl md:text-1xl text-xs text-white bg-black mb-10 transition-all duration-500 ${
                isHovered1 ? 'opacity-75' : ''
              }`}
            >
              Explore MSI's Hottest Deals
            </p>
            <a href="/shop">
            <button
              className={`text-black bg-white px-6 py-3 font-bold rounded-lg transition-all duration-500 ${
                isHovered1 ? 'opacity-90' : ''
              }`}
            >
              Shop Now
            </button>
            </a>
          </div>
        </div>

        {/* Second Banner */}
        <div
          className="relative flex flex-col items-center justify-center max-w-2xl max-h-80 hover:scale-105 transition duration-150 ease-in-out"
          onMouseEnter={() => setIsHovered2(true)}
          onMouseLeave={() => setIsHovered2(false)}
        >
          <img
            src='https://wallpapers.com/images/hd/green-razer-splash-art-akvfwnu1t844qxbm.jpg'
            className={`w-full h-auto mx-auto  transition-all duration-500`}
            alt="Banner 2"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center ">
            <p
              className={`lg:text-4xl md:text-1xl text-xs font-poppins font-sans text-white bg-black mb-10 transition-all duration-500 ${
                isHovered2 ? 'opacity-75' : ''
              }`}
            >
              Explore Razor's Hottest Deals
            </p>
            <a href="/shop">
            <button
              className={`text-black bg-white px-6 py-3 font-poppins font-sans font-bold rounded-lg transition-all duration-500 ${
                isHovered2 ? 'opacity-90' : ''
              }`}
            >
              Shop Now
            </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner2;

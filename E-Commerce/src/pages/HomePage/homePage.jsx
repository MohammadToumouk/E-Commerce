import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import "../../components/Navbar/navbar";
import Privacy from "../Privacy/Privacy";
import Carousel from "../../components/Carousel/carousel";
import { Featured } from "../../components/FeaturedProducts/Featured";
import { ContactUsSection } from "../../components/ContactUs/ContactUsSection";
import { Banner } from "../../components/Banner/Banner";
import Banner2 from "../../components/Banner/Banner2";
import { Plus, PlusCircle, XIcon } from 'lucide-react'
import Stripe from "stripe";

const HomePage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    
     
      <div style={{width: "100%",display:"flex", flexDirection:"column", gap:"0px"}} >
        <br/><br/><br/><br/>
        <Carousel />
        <hr className="w-9/12 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
        <br/><br/>
        <Featured />
        <hr className="w-9/12 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
        <br/><br/>
        <Banner2 />
        <hr className="w-9/12 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
        <br/><br/>
        <Banner />
        <hr className="w-9/12 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
        
        <br/><br/>
        <ContactUsSection />
        
        <div className="scroll-progress-container">
        <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      </div>
    </div>
  );
};

export default HomePage;
 {/* <div className="image-container">
        <div className="image-text">
          <p>FASHION LIKE NEVER BEFORE</p>
          <h1>We bring premium goods for you</h1>
          <Link to="/shop" className="shop-link">
          Go to shop
          <span className="arrow-icon"></span>
        </Link>

       </div>
       
        <img
        src="https://img.etimg.com/thumb/msid-95237936,width-1200,height-900,imgsize-39628,resizemode-8,quality-100/tech/technology/online-shopping-a-pandemic-habit-that-stuck.jpg"
        alt="ShoppingImage"
      style={{ width: '500px', height: 'auto', borderRadius: '8px' }}
  />
  <img src="https://cdn.pixabay.com/photo/2016/11/22/19/08/hangers-1850082_1280.jpg"       
      alt="OverlayImage"
      className="overlay-image"
      style={{ width: '500px', height: 'auto', borderRadius: '8px' }}/>
</div> */}
import React from 'react'
import { useInView } from 'react-intersection-observer';
import '../FadeInScroll.css'
import { NavLink } from 'react-router-dom';

export const ContactUsSection = () => {

  const [ref, inView] = useInView({
    triggerOnce: true, // The fade-in animation will be triggered only once when the component enters the viewport
    threshold: 0.1, // Percentage of component visibility required to trigger the animation
  });

  return (
    <div ref={ref} className={`fade-in ${inView ? 'visible' : ''}`}>
    <div className="flex flex-row items-center justify-between h-80 mx-20">
    <p className="text-2xl ">Need Help ?&#8594;</p>

    <NavLink to="/contact" className="text-8xl flex-1 w-64 align-middle underline decoration-yellow-200 hover:cursor-pointer ">Contact us</NavLink>
    <NavLink to="/contact" className="bg-yellow-300 w-20 h-20 rounded-full flex items-center justify-center">

      <p style={{ fontSize: "30px" }}>&#8594;</p>
    </NavLink>
  </div>
  </div>
  )
}

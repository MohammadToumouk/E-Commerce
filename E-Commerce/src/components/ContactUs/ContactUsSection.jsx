import React from 'react'
import { useInView } from 'react-intersection-observer';
import '../FadeInScroll.css'

export const ContactUsSection = () => {

  const [ref, inView] = useInView({
    triggerOnce: true, // The fade-in animation will be triggered only once when the component enters the viewport
    threshold: 0.1, // Percentage of component visibility required to trigger the animation
  });

  return (
    <div ref={ref} className={`fade-in ${inView ? 'visible' : ''}`}>
    <div className="flex flex-row items-center justify-between h-80 mx-20">
    <p className="text-2xl ">Need Help ?&#8594;</p>
    <a href="/contact" className="lg:text-8xl  text-5xl  flex-1 w-64 align-middle underline decoration-yellow-200 hover:cursor-pointer">Contact us</a>
    <div className="bg-yellow-300 lg:w-20 lg:h-20 md:w-10 md:h-10 w-8 h-8 rounded-full flex items-center justify-center">
      <p style={{ fontSize: "30px" }}>&#8594;</p>
    </div>
  </div>
  </div>
  )
}

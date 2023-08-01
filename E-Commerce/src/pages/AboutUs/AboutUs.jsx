import React from 'react';
import './AboutUs.css';
import { useInView } from 'react-intersection-observer';
import '../../components/FadeInScroll.css'

const AboutUs = () => {

  const [ref, inView] = useInView({
    triggerOnce: true, // The fade-in animation will be triggered only once when the component enters the viewport
    threshold: 0.1, // Percentage of component visibility required to trigger the animation
  });

  return (
    <div ref={ref} className={`about-us-container fade-in  ${inView ? 'visible' : ''}`}>
      <h2 className="about-us-title">ABOUT US</h2>
      <p className="about-us-text">
        Welcome to our online store! We are a team of three dedicated individuals: Mohammad, Ermias, and Aleksandar. We are thrilled to present our final project as part of our bootcamp journey.
          Our goal is to bring you a unique and enjoyable shopping experience. We have curated a collection of high-quality products that we believe will meet your needs and exceed your expectations. From fashion to accessories, we have carefully selected each item to ensure its style, durability, and value.
           At our online store, we prioritize customer satisfaction. We strive to provide excellent customer service, seamless order processing, and secure payment options. Your trust and satisfaction are of utmost importance to us, and we are here to assist you every step of the way.
            Thank you for choosing our online store. We hope you enjoy exploring our products and find something that speaks to your style and personality. If you have any questions, feedback, or suggestions, please don't hesitate to reach out to us. We value your input and are always looking for ways to improve.
            Happy shopping!
      </p>
      <div className="team-member-cards">
          <div className="team-member-card">
          <img src="https://media.licdn.com/dms/image/D4E03AQGFPh5dlGiDlQ/profile-displayphoto-shrink_200_200/0/1688028531629?e=1696464000&v=beta&t=B-r8vQJJLBTFVc9Oc_PF1gokovCRxcAME-k2m8X2NgQ" alt="Mohammad" />
          <h3>Mohammad</h3>
          <p>The coding wizard who can turn bugs into butterflies.</p>
        </div>

          <div className="team-member-card">
          <img src="https://i.pinimg.com/736x/2d/da/c5/2ddac512a3df8924992a7055cb62ea1f.jpg" alt="Ermias" />
          <h3>Ermias</h3>
          <p>The Tech guru with a passion for pixel-perfect designs.</p>
        </div>

        <div className="team-member-card">
          <img src="https://media.licdn.com/dms/image/D4E03AQFXmqCrVzOXVg/profile-displayphoto-shrink_200_200/0/1687941382485?e=1696464000&v=beta&t=vCmGPqXN7HZAE5snSd8aX8lbpvJU_7Xx9w-8C-8tInM" alt="Aleksandar" />
          <h3>Aleksandar</h3>
          <p>The master of all things tech and a coffee-fueled machine.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

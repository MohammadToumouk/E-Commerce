import React from 'react';
import './Privacy.css';
import { Link } from 'react-router-dom'

const Privacy = () => {
  return (
    <div className="privacy-container">
      <img className="privacy-img" src="https://www.pngall.com/wp-content/uploads/2017/05/Privacy-Policy-Symbol.png"></img>
      <h2 className="privacy-title">PRIVACY POLICY</h2>

      <p>
        [EMAzing Online Store] ("we" or "us") is committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our online shopping store (the "Site").
      </p>
      <hr className="w-9/12 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
      <h3>Information We Collect</h3>

      <p>
        - When you visit our Site, we may collect certain information automatically, including your IP address, browser type, and browsing activity.
        <br />
        - If you choose to register an account with us, we may collect your name, email address, shipping address, and payment information.
        <br />
        - We may collect additional information from you when you interact with our Site, such as when you place an order, contact customer support, or participate in surveys or promotions.
      </p>

      <h3>Use of Information</h3>
      <hr className="w-9/12 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
      <p>
        - We use the information we collect to process and fulfill your orders, provide customer support, communicate with you about your orders and account, and improve our products and services.
        <br />
        - We may use your information to send you promotional emails or newsletters, but you can opt out of receiving these communications at any time.
        <br />
        - We do not sell or rent your personal information to third parties for their marketing purposes.
      </p>
      <hr className="w-9/12 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
      <h3>Disclosure of Information</h3>

      <p>
        - We may disclose your personal information to third-party service providers who assist us in operating our Site, processing payments, and delivering products to you.
        <br />
        - We may disclose your personal information if required by law or to protect our rights, property, or safety, or the rights, property, or safety of others.
      </p>
      <hr className="w-9/12 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
      <h3>Data Retention</h3>

      <p>
        - We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
        <br />
        - If you wish to delete your account or have your personal information removed from our systems, please contact us using the information provided at the end of this Privacy Policy.
      </p>
      <hr className="w-9/12 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
      <h3>Changes to this Privacy Policy</h3>

      <p>
        - We may update this Privacy Policy from time to time. The updated version will be posted on our Site with the revised effective date.
      </p>
      <hr className="w-9/12 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
      <h3>Contact Information</h3>

      <p>
        If you have any questions or concerns about our Privacy Policy or the handling of your personal information, please contact us through our <Link className="hover-effect-button" to="/contact">Contact Form</Link>
      </p> 
      <hr className="w-9/12 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
    </div>
    
  );
};

export default Privacy;

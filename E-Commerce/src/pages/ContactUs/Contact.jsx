import React, { useState } from 'react';
import './Contact.css'; // Make sure the path to the CSS file is correct

const Contact = () => {
 return (
    <div className="landing_page flex">
      <div className="responsive-container-block big-container flex">
        {/* <img
          className="bg-img"
          id="iq5bf"
        //   src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/clothes-bg.png"
          alt="Background"
        /> */}
        <div className="responsive-container-block container">
          <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12 left-one">
            <div className="content-box">
              <p className="text-blk section-head">GET IN TOUCH</p>
              <p className="text-blk section-subhead">
              We value your feedback and are always excited to hear from our customers. If you have any
        questions, suggestions, or just want to say hello, feel free to reach out to us using the
        contact form.
              </p>
              {/* <div className="icons-container">
                <a className="share-icon">
                  <img
                    className="img"
                    src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-twitter.png"
                    alt="Twitter"
                  />
                </a>
                <a className="share-icon">
                  <img
                    className="img"
                    src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-facebook.png"
                    alt="Facebook"
                  />
                </a>
                <a className="share-icon">
                  <img
                    className="img"
                    src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-google.png"
                    alt="Google"
                  />
                </a>
                <a className="share-icon">
                  <img
                    className="img"
                    src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-instagram.png"
                    alt="Instagram"
                  />
                </a>
              </div> */}
            </div>
          </div>
          <div
            className="responsive-cell-block wk-ipadp-6 wk-tab-12 wk-mobile-12 wk-desk-6 right-one"
            id="i1zj"
          >
            <form className="form-box">
              <div className="container-block form-wrapper">
                <p className="text-blk contactus-head">
                  <a className="link" href="">
                    Contact Us
                  </a>
                </p>
                <p className="text-blk contactus-subhead">We will get back to you in 24 hours</p>
                <div className="responsive-container-block">
                  <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="i10mt-7">
                    <input
                      className="input"
                      id="ijowk-7"
                      name="FirstName"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="i1ro7">
                    <input
                      className="input"
                      id="indfi-5"
                      name="Last Name"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-6 wk-ipadp-6 emial" id="ityct">
                    <input className="input" id="ipmgh-7" name="Email" placeholder="Email" />
                  </div>
                  <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                    <input
                      className="input"
                      id="imgis-6"
                      name="PhoneNumber"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="i634i-7">
                    <textarea
                      aria-placeholder="Type message here"
                      className="textinput"
                      id="i5vyy-7"
                      placeholder="Type message here"
                    ></textarea>
                  </div>
                </div>
                <button className="submit-btn">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Contact;

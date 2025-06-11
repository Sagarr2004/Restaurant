import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <section>
      <div className="footer">
        <div className="footer__content">
          <div className="footer__section">
            <h4>About Us</h4>
            <a href="/about">About the Restaurant</a>
            <a href="/menu">Our Menu</a>
            <a href="/reviews">Customer Reviews</a>
            <a href="/gallery">Photo Gallery</a>
          </div>

          <div className="footer__section">
            <h4>Services</h4>
            <a href="/reservation">Make a Reservation</a>
            <a href="/events">Host an Event</a>
            <a href="/delivery">Food Delivery</a>
            <a href="/catering">Catering Services</a>
          </div>

          <div className="footer__section">
            <h4>Contact</h4>
            <a href="/contact">Contact Us</a>
            <a href="tel:+1234567890">Call Us: 098339 47928</a>
            <a href="mailto:info@restaurant.com">Email: sagarchavan0061@gmail.com</a>
            <a href="/location">Find Us</a>
          </div>

          <div className="footer__section">
            <h4>Follow Us</h4>
            <div className="footer__social-media">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <hr />
        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Awesome Restaurant. All rights reserved.</p>
          <div className="footer__links">
            <a href="/terms">Terms & Conditions</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/cookies">Cookies</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;

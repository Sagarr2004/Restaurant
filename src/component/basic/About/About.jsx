import React from 'react';
import "./About.css"

function About() {
  return (
    <div className="about-page">
      <header>
      <h2>
            <span>A</span>wsome
            <span>R</span>estaurant
          </h2>
        {/* <img src="restaurant-image.jpg" alt="Restaurant Image" /> */}
      </header>

      <main>
        <section>
          {/* <h2>About Us</h2> */}
                    
                <h1>Welcome to our Food Restaurant!</h1>
                <p>
                    At [Awsome Restaurant], we believe that great food has the power to bring people together, create memories, and satisfy the soul. Our restaurant is a culmination of our passion for culinary excellence, warm hospitality, and an unforgettable dining experience.
                </p>
                <p>
                    Our team of talented chefs, dedicated staff, and food enthusiasts work tirelessly to bring you a menu that showcases the finest flavors from around the world. We take pride in using fresh, locally sourced ingredients to create mouthwatering dishes that cater to a variety of tastes and dietary preferences.
                </p>
               
               
                <p>
                    Thank you for choosing [Awsome Restaurant]!
                </p>
         
        </section>

        <section>
          <h2>Contact Information</h2>
          <ul>
            <li>Email: <a href="mailto:info@restaurant.com">sagarchavan0061@gmail.com</a></li>
            <li>Phone: <a href="tel:+1234567890">+91 9833947928</a></li>
          </ul>
        </section>

        <section>
          <h2>Timeline</h2>
          <p>Established in 2024, we have been serving delicious meals to our customers for several years.</p>
        </section>

        <section>
          <h2>Follow Us on Social Media</h2>
          <ul>
            <li><a href="https://www.facebook.com/share/15S2iP2a1G/">Facebook</a></li>
            <li><a href="https://www.instagram.com/sagar_chavan_98/">Instagram</a></li>
            <li><a href="https://www.youtube.com/channel/restaurant">YouTube</a></li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default About;

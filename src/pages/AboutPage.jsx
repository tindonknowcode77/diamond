import React from 'react';

const AboutPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>About DiamondWord</h1>
        <p>Our story, values, and commitment to excellence</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2005, DiamondWord began as a small family business with a passion for diamond jewelry. 
            What started as a modest shop has grown into a renowned brand known for exquisite craftsmanship 
            and exceptional quality. Our journey has been guided by our commitment to excellence and our 
            dedication to creating timeless pieces that celebrate life's most precious moments.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Quality</h3>
              <p>We source only the finest diamonds and materials to ensure every piece meets our high standards.</p>
            </div>
            <div className="value-card">
              <h3>Craftsmanship</h3>
              <p>Our master jewelers combine traditional techniques with modern innovation to create stunning pieces.</p>
            </div>
            <div className="value-card">
              <h3>Integrity</h3>
              <p>We believe in transparency and ethical practices throughout our entire supply chain.</p>
            </div>
            <div className="value-card">
              <h3>Service</h3>
              <p>We provide personalized service to help each customer find their perfect diamond.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Commitment</h2>
          <p>
            At DiamondWord, we are committed to responsible sourcing and sustainability. We work only with 
            suppliers who adhere to the Kimberley Process and ensure all our diamonds are conflict-free. 
            We also strive to minimize our environmental impact through eco-friendly practices in our 
            workshops and stores.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;

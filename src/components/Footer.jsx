import React from 'react';

const Footer = ({ setActivePage }) => {
  return (
    <footer className="footer pnj-style">
      <div className="footer-top">
        <div className="footer-content">
          <div className="footer-section about-section">
            <h3 className="footer-title">DiamondWord</h3>
            <p className="footer-description">
              Luxury diamond jewelry crafted with excellence. We offer premium quality diamonds and exquisite designs for life's special moments.
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon">📱</a>
              <a href="#" className="social-icon">📘</a>
              <a href="#" className="social-icon">📸</a>
              <a href="#" className="social-icon">📹</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Customer Service</h3>
            <div className="footer-links">
              <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('about'); }}>About Us</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>Contact Us</a>
              <a href="#" onClick={(e) => { e.preventDefault(); }}>FAQs</a>
              <a href="#" onClick={(e) => { e.preventDefault(); }}>Shipping Policy</a>
              <a href="#" onClick={(e) => { e.preventDefault(); }}>Returns & Exchanges</a>
              <a href="#" onClick={(e) => { e.preventDefault(); }}>Privacy Policy</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Collections</h3>
            <div className="footer-links">
              <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('collections'); }}>Engagement Rings</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('collections'); }}>Wedding Bands</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('collections'); }}>Diamond Necklaces</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('collections'); }}>Diamond Earrings</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('collections'); }}>Diamond Bracelets</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('collections'); }}>Special Occasions</a>
            </div>
          </div>
          
          <div className="footer-section contact-section">
            <h3 className="footer-title">Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">🏠</span>
                <span>123 Diamond Street, New York, NY 10001</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <a href="mailto:info@diamondword.com">info@diamondword.com</a>
              </div>
              <div className="store-hours">
                <p><strong>Business Hours</strong></p>
                <p>Mon - Fri: 9:00 AM - 8:00 PM</p>
                <p>Sat - Sun: 10:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
     
    </footer>
  );
};

export default Footer;

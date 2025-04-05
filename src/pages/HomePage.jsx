import React from 'react';
import ProductShowcase from '../components/ProductShowcase';
import ProductList from '../components/ProductList';

const HomePage = ({ addToCart, viewProductDetail }) => {
  return (
    <>
      <div className="hero-section">
        <div className="hero-content">
          <h1>Timeless Elegance in Every Diamond</h1>
          <p>Discover our exclusive collection of premium diamond jewelry</p>
          <button className="cta-button">Explore Collection</button>
        </div>
      </div>
      
      <div className="category-banners">
        <div className="category-banner">
          <img src="https://images.unsplash.com/photo-1589207212797-cfd546dea0fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Rings" />
          <div className="category-content">
            <h3>Rings</h3>
            <a href="#" className="category-link">View Collection</a>
          </div>
        </div>
        <div className="category-banner">
          <img src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Necklaces" />
          <div className="category-content">
            <h3>Necklaces</h3>
            <a href="#" className="category-link">View Collection</a>
          </div>
        </div>
        <div className="category-banner">
          <img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Earrings" />
          <div className="category-content">
            <h3>Earrings</h3>
            <a href="#" className="category-link">View Collection</a>
          </div>
        </div>
        <div className="category-banner">
          <img src="https://images.unsplash.com/photo-1633810542706-90e200222f95?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Bracelets" />
          <div className="category-content">
            <h3>Bracelets</h3>
            <a href="#" className="category-link">View Collection</a>
          </div>
        </div>
      </div>
      
      <div className="promotion-banner">
        <div className="promotion-content">
          <h2>Special Offer</h2>
          <h3>UP TO 30% OFF</h3>
          <p>On selected diamond jewelry</p>
          <button className="promotion-button">Shop Now</button>
        </div>
      </div>
      
      <ProductShowcase addToCart={addToCart} viewProductDetail={viewProductDetail} />
      
      <div className="services-section">
        <div className="service-item">
          <div className="service-icon">🛒</div>
          <h3>Free Shipping</h3>
          <p>On orders over $1000</p>
        </div>
        <div className="service-item">
          <div className="service-icon">🔄</div>
          <h3>30-Day Returns</h3>
          <p>Money back guarantee</p>
        </div>
        <div className="service-item">
          <div className="service-icon">🔒</div>
          <h3>Secure Payments</h3>
          <p>100% secure checkout</p>
        </div>
        <div className="service-item">
          <div className="service-icon">💬</div>
          <h3>24/7 Support</h3>
          <p>Dedicated customer service</p>
        </div>
      </div>
      
      <ProductList addToCart={addToCart} viewProductDetail={viewProductDetail} />
    </>
  );
};

export default HomePage;

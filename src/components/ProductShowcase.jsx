import React from 'react';
import { diamondProducts } from '../data/products';

const ProductShowcase = ({ addToCart, viewProductDetail }) => {
  // Select featured products (first 3 premium products)
  const featuredProducts = diamondProducts
    .sort((a, b) => b.price - a.price)
    .slice(0, 3);
  
  return (
    <section className="showcase-section">
      <div className="showcase-header">
        <h2>Featured Collection</h2>
        <p>Our most exquisite diamond pieces, handcrafted for perfection</p>
      </div>
      
      <div className="showcase-grid">
        {featuredProducts.map(product => (
          <div key={product.id} className="showcase-card">
            <div className="showcase-image-container">
              <img 
                src={product.image} 
                alt={product.name} 
                className="showcase-image"
                onClick={() => viewProductDetail(product.id)}
              />
              <div className="showcase-overlay">
                <button 
                  className="showcase-button"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            
            <div className="showcase-info">
              <h3 
                className="showcase-title"
                onClick={() => viewProductDetail(product.id)}
              >
                {product.name}
              </h3>
              <div className="showcase-details">
                <div className="showcase-specs">
                  <p><span>Carats:</span> {product.carats}</p>
                  <p><span>Clarity:</span> {product.clarity}</p>
                  <p><span>Color:</span> {product.color}</p>
                </div>
                <div className="showcase-price">
                  <p className="price-label">Price</p>
                  <p className="price-value">${product.price.toLocaleString()}</p>
                </div>
              </div>
              <p className="showcase-description">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductShowcase;

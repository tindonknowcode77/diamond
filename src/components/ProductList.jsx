import React, { useState } from 'react';
import { diamondProducts } from '../data/products';

const ProductList = ({ addToCart, viewProductDetail }) => {
  const [priceFilter, setPriceFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // Filter and sort products
  const filteredProducts = diamondProducts.filter(product => {
    if (priceFilter !== 'all') {
      const [min, max] = priceFilter.split('-').map(Number);
      if (max) {
        if (product.price < min || product.price > max) return false;
      } else {
        if (product.price < min) return false;
      }
    }
    
    if (typeFilter !== 'all' && product.type !== typeFilter) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="product-container">
      <h2>Our Diamond Collection</h2>
      
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="price-filter">Price Range:</label>
          <select 
            id="price-filter" 
            value={priceFilter} 
            onChange={e => setPriceFilter(e.target.value)}
          >
            <option value="all">All Prices</option>
            <option value="1000-3000">$1,000 - $3,000</option>
            <option value="3000-5000">$3,000 - $5,000</option>
            <option value="5000-10000">$5,000 - $10,000</option>
            <option value="10000">$10,000+</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="type-filter">Type:</label>
          <select 
            id="type-filter" 
            value={typeFilter} 
            onChange={e => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="ring">Rings</option>
            <option value="necklace">Necklaces</option>
            <option value="earring">Earrings</option>
            <option value="bracelet">Bracelets</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="sort-by">Sort By:</label>
          <select 
            id="sort-by" 
            value={sortBy} 
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="default">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
      
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-badge">{product.type}</div>
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-image" 
              onClick={() => viewProductDetail(product.id)}
            />
            <div className="product-info">
              <h3 
                className="product-title"
                onClick={() => viewProductDetail(product.id)}
              >
                {product.name}
              </h3>
              
              <div className="product-specs">
                <div className="spec-item">
                  <span className="spec-label">Carats:</span> {product.carats}
                </div>
                <div className="spec-item">
                  <span className="spec-label">Clarity:</span> {product.clarity}
                </div>
                <div className="spec-item">
                  <span className="spec-label">Color:</span> {product.color}
                </div>
              </div>
              
              <p className="product-description">{product.description}</p>
              
              <div className="product-price-container">
                <p className="product-price">${product.price.toLocaleString()}</p>
                <div className="product-actions">
                  <button 
                    className="add-to-cart"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button 
                    className="view-details"
                    onClick={() => viewProductDetail(product.id)}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

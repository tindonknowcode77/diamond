import React, { useState, useEffect } from 'react';
import { diamondProducts } from '../data/products';

const ProductDetailPage = ({ productId, addToCart, setActivePage }) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Generate additional product images for gallery (simulated)
  const generateAdditionalImages = (mainImage) => {
    // In a real application, these would be actual different images of the product
    return [
      mainImage,
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605100797606-40253a2d8c75?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600721391776-028bafcbfb90?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ];
  };

  useEffect(() => {
    // Find the product with the matching ID
    const foundProduct = diamondProducts.find(p => p.id === parseInt(productId));
    
    if (foundProduct) {
      // Add a property with additional images
      foundProduct.images = generateAdditionalImages(foundProduct.image);
      setProduct(foundProduct);
      
      // Find related products (same type, excluding current product)
      const related = diamondProducts
        .filter(p => p.type === foundProduct.type && p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <h2>Loading product information...</h2>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Add to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    // Show confirmation message
    alert(`${quantity} ${product.name} added to your cart`);
  };

  const calculateDiscount = (price) => {
    // Simulate a discount
    const discount = Math.round(price * 0.15); // 15% discount
    return discount;
  };

  return (
    <div className="page-container">
      <div className="product-detail-container">
        <div className="product-detail-breadcrumb">
          <span onClick={() => setActivePage('home')}>Home</span> / 
          <span onClick={() => setActivePage('collections')}> Collections</span> / 
          <span onClick={() => setActivePage('diamonds')}> {product.type.charAt(0).toUpperCase() + product.type.slice(1)}s</span> / 
          <span className="current-page"> {product.name}</span>
        </div>

        <div className="product-detail-content">
          <div className="product-detail-gallery">
            <div className="main-image-container">
              <img 
                src={product.images[activeImage]} 
                alt={product.name} 
                className="main-product-image"
              />
              {product.type === 'ring' && (
                <div className="product-badge special">Engagement</div>
              )}
            </div>
            
            <div className="thumbnail-gallery">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="product-detail-info" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
            <h1 className="product-detail-title">{product.name}</h1>
            
            <div className="product-detail-rating">
              <div className="stars">★★★★★</div>
              <span className="review-count">32 Reviews</span>
            </div>
            
            <div className="product-detail-price">
              <div className="price-container">
                <span className="current-price" style={{ color: '#e0c285' }}>${product.price.toLocaleString()}</span>
                <span className="original-price" style={{ color: '#ffffff' }}>${(product.price + calculateDiscount(product.price)).toLocaleString()}</span>
                <span className="discount-badge" style={{ color: '#e0c285' }}>Save ${calculateDiscount(product.price).toLocaleString()}</span>
              </div>
              <p className="price-installment" style={{ color: '#ffffff' }}>Or 4 interest-free payments of ${(product.price / 4).toLocaleString()} with <strong>DiamondPay</strong></p>
            </div>
            
            <div className="product-detail-specs">
              <div className="spec-row">
                <div className="spec-name">Carat</div>
                <div className="spec-value">{product.carats} ct</div>
              </div>
              <div className="spec-row">
                <div className="spec-name">Clarity</div>
                <div className="spec-value">{product.clarity}</div>
              </div>
              <div className="spec-row">
                <div className="spec-name">Color</div>
                <div className="spec-value">{product.color}</div>
              </div>
              <div className="spec-row">
                <div className="spec-name">Cut</div>
                <div className="spec-value">Excellent</div>
              </div>
              <div className="spec-row">
                <div className="spec-name">Metal</div>
                <div className="spec-value">18K White Gold</div>
              </div>
            </div>
            
            <div className="product-detail-description">
              <h3>Product Description</h3>
              <p>{product.description}</p>
              <p>This exquisite piece is crafted with the highest quality materials and expert craftsmanship. Each diamond is hand-selected for exceptional brilliance and fire, ensuring a stunning piece that will be treasured for generations.</p>
            </div>
            
            <div className="product-detail-actions">
              <div className="quantity-selector">
                <button onClick={() => handleQuantityChange(-1)} disabled={quantity === 1}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange(1)}>+</button>
              </div>
              
              <button className="add-to-cart-button" onClick={handleAddToCart}>
                Add to Cart
              </button>
              
              <button className="wishlist-button">
                ♡ Add to Wishlist
              </button>
            </div>
            
            <div className="product-detail-benefits">
              <div className="benefit-item">
                <div className="benefit-icon">🚚</div>
                <div className="benefit-text">
                  <h4>Free Shipping</h4>
                  <p>On orders over $1000</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">💎</div>
                <div className="benefit-text">
                  <h4>Lifetime Warranty</h4>
                  <p>For all our diamond jewelry</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">⭐</div>
                <div className="benefit-text">
                  <h4>30-Day Returns</h4>
                  <p>Hassle-free return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="product-detail-tabs">
          <div className="tab-headers">
            <div className="tab-header active">Description</div>
            <div className="tab-header">Specifications</div>
            <div className="tab-header">Reviews</div>
            <div className="tab-header">Shipping & Returns</div>
          </div>
          
          <div className="tab-content">
            <div className="tab-description">
              <h3>About {product.name}</h3>
              <p>{product.description}</p>
              <p>Our diamonds are ethically sourced and conflict-free, adhering to the Kimberley Process. Each piece comes with a certificate of authenticity verifying its quality and specifications.</p>
              <p>This {product.type} features a brilliant cut diamond that maximizes light return through the crown, creating exceptional sparkle and brilliance. The setting is meticulously crafted to enhance the beauty of the center stone while ensuring durability and comfort.</p>
              <h4>Key Features:</h4>
              <ul>
                <li>Premium {product.carats} carat diamond with {product.clarity} clarity</li>
                <li>Color grade: {product.color} (exceptional white)</li>
                <li>Excellent cut grade for maximum brilliance</li>
                <li>18K white gold setting</li>
                <li>Secure prong setting</li>
                <li>Includes luxury gift box</li>
                <li>Complimentary first cleaning and inspection</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="related-products-section">
          <h2>You May Also Like</h2>
          <div className="related-products-grid">
            {relatedProducts.map(related => (
              <div key={related.id} className="related-product-card">
                <div className="related-product-image">
                  <img src={related.image} alt={related.name} />
                </div>
                <div className="related-product-info">
                  <h3>{related.name}</h3>
                  <p className="related-product-price">${related.price.toLocaleString()}</p>
                  <div className="related-product-actions">
                    <button onClick={() => {
                      setActivePage('product-detail');
                      window.productId = related.id;
                    }}>View Details</button>
                    <button onClick={() => addToCart(related)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

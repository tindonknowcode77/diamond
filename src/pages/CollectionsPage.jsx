import React, { useState } from 'react';
import { diamondProducts } from '../data/products';

const CollectionsPage = ({ addToCart, viewProductDetail }) => {
  // Define collection categories similar to PNJ
  const collections = [
    {
      id: 'wedding',
      name: 'Wedding Collection',
      description: 'Celebrate your special day with our exquisite wedding jewelry',
      image: 'https://images.unsplash.com/photo-1587056177059-5c6ecae0dae0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      products: diamondProducts.filter(p => p.type === 'ring').slice(0, 4)
    },
    {
      id: 'signature',
      name: 'Signature Collection',
      description: 'Exclusive designs with the finest diamonds and craftsmanship',
      image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      products: diamondProducts.filter(p => p.price > 8000).slice(0, 4)
    },
    {
      id: 'eternity',
      name: 'Eternity Collection',
      description: 'Timeless designs crafted for endless love',
      image: 'https://images.unsplash.com/photo-1605797110419-1c85c138e404?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      products: diamondProducts.filter(p => p.type === 'necklace').slice(0, 4)
    },
    {
      id: 'limited',
      name: 'Limited Edition',
      description: 'Unique pieces with extraordinary design and craftsmanship',
      image: 'https://images.unsplash.com/photo-1609245340409-cad2474ab1d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      products: diamondProducts.filter(p => p.clarity === 'VVS1').slice(0, 4)
    }
  ];

  const [selectedCollection, setSelectedCollection] = useState(null);

  const handleCollectionClick = (collectionId) => {
    setSelectedCollection(collectionId === selectedCollection ? null : collectionId);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Our Collections</h1>
        <p>Discover our curated collections of diamond jewelry</p>
      </div>

      <div className="collections-showcase">
        {collections.map(collection => (
          <div key={collection.id} className="collection-showcase-item">
            <div className="collection-showcase-image">
              <img src={collection.image} alt={collection.name} />
              <div className="collection-showcase-overlay">
                <div className="collection-showcase-details">
                  <h2>{collection.name}</h2>
                  <p>{collection.description}</p>
                  <button 
                    className="view-collection-btn"
                    onClick={() => handleCollectionClick(collection.id)}
                  >
                    {selectedCollection === collection.id ? 'Hide Collection' : 'View Collection'}
                  </button>
                </div>
              </div>
            </div>
            
            {selectedCollection === collection.id && (
              <div className="collection-products">
                <h3>Featured Products</h3>
                <div className="collection-products-grid">
                  {collection.products.map(product => (
                    <div key={product.id} className="collection-product-card">
                      <div className="collection-product-image">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          onClick={() => viewProductDetail(product.id)}
                        />
                        <div className="quick-actions">
                          <button onClick={() => viewProductDetail(product.id)}>
                            Quick View
                          </button>
                          <button onClick={() => addToCart(product)}>
                            Add to Cart
                          </button>
                        </div>
                      </div>
                      <div className="collection-product-info">
                        <h4 onClick={() => viewProductDetail(product.id)}>{product.name}</h4>
                        <div className="collection-product-specs">
                          <span>{product.carats} Carats</span>
                          <span>{product.clarity}</span>
                          <span>{product.color}</span>
                        </div>
                        <p className="collection-product-price">${product.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="view-all-link">
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    setActivePage('diamonds');
                  }}>View All Products ›</a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionsPage;

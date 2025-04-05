import React from 'react';
import ProductList from '../components/ProductList';

const DiamondsPage = ({ addToCart, viewProductDetail }) => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Our Diamond Collection</h1>
        <p>Browse our extensive selection of high-quality diamonds</p>
      </div>
      <ProductList addToCart={addToCart} viewProductDetail={viewProductDetail} />
    </div>
  );
};

export default DiamondsPage;

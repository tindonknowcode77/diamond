import React from 'react';

const Cart = ({ items, removeFromCart, proceedToCheckout }) => {
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>
      
      {items.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <p>Add some beautiful diamonds to your cart</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.name}</h3>
                  <p className="cart-item-price">${item.price.toLocaleString()}</p>
                </div>
                <div className="cart-item-quantity">
                  Quantity: {item.quantity}
                </div>
                <button 
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <p className="cart-total">Total: ${totalPrice.toLocaleString()}</p>
            <button className="checkout-button" onClick={proceedToCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

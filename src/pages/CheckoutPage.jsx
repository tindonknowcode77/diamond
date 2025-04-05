import React, { useState, useEffect } from 'react';

const CheckoutPage = ({ cartItems, setActivePage }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    deliveryMethod: 'standard',
    paymentMethod: 'credit',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);
  
  // Calculate order totals
  useEffect(() => {
    const calculatedSubtotal = cartItems.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0);
    
    const calculatedTax = calculatedSubtotal * 0.08; // 8% tax
    
    let calculatedShipping = 0;
    if (formData.deliveryMethod === 'standard') {
      calculatedShipping = 15;
    } else if (formData.deliveryMethod === 'express') {
      calculatedShipping = 35;
    } else if (formData.deliveryMethod === 'overnight') {
      calculatedShipping = 50;
    }
    
    setSubtotal(calculatedSubtotal);
    setTax(calculatedTax);
    setShipping(calculatedShipping);
    setTotal(calculatedSubtotal + calculatedTax + calculatedShipping);
  }, [cartItems, formData.deliveryMethod]);
  
  // Update delivery method and recalculate
  const handleDeliveryChange = (e) => {
    setFormData({
      ...formData,
      deliveryMethod: e.target.value
    });
  };
  
  // Handle payment method change
  const handlePaymentChange = (e) => {
    setFormData({
      ...formData,
      paymentMethod: e.target.value
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    // Validate contact information
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    
    // Validate shipping information
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.postalCode.trim()) errors.postalCode = 'Postal code is required';
    
    // Validate payment information (only if credit card is selected)
    if (formData.paymentMethod === 'credit') {
      if (!formData.cardNumber.trim()) {
        errors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        errors.cardNumber = 'Invalid card number';
      }
      
      if (!formData.cardName.trim()) errors.cardName = 'Name on card is required';
      
      if (!formData.expiryDate.trim()) {
        errors.expiryDate = 'Expiry date is required';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        errors.expiryDate = 'Invalid format (MM/YY)';
      }
      
      if (!formData.cvv.trim()) {
        errors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        errors.cvv = 'Invalid CVV';
      }
    }
    
    return errors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }
    
    // Process the order
    console.log('Order submitted:', { formData, orderItems: cartItems, total });
    
    // Show success message
    alert('Your order has been placed successfully! Order total: $' + total.toFixed(2));
    
    // Redirect to home page or order confirmation page
    setActivePage('home');
  };
  
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Checkout</h1>
        <p>Complete your purchase by filling out the information below</p>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="empty-checkout">
          <h2>Your cart is empty</h2>
          <p>Add some beautiful diamond jewelry to your cart before checkout.</p>
          <button onClick={() => setActivePage('home')} className="cta-button">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="checkout-container">
          <div className="checkout-form-container">
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="checkout-section">
                <h2>Contact Information</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      value={formData.firstName}
                      onChange={handleChange}
                      className={formErrors.firstName ? 'error' : ''}
                    />
                    {formErrors.firstName && <div className="error-message">{formErrors.firstName}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      value={formData.lastName}
                      onChange={handleChange}
                      className={formErrors.lastName ? 'error' : ''}
                    />
                    {formErrors.lastName && <div className="error-message">{formErrors.lastName}</div>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className={formErrors.email ? 'error' : ''}
                    />
                    {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      className={formErrors.phone ? 'error' : ''}
                    />
                    {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
                  </div>
                </div>
              </div>
              
              <div className="checkout-section">
                <h2>Shipping Information</h2>
                <div className="form-group">
                  <label htmlFor="address">Street Address *</label>
                  <input 
                    type="text" 
                    id="address" 
                    name="address" 
                    value={formData.address}
                    onChange={handleChange}
                    className={formErrors.address ? 'error' : ''}
                  />
                  {formErrors.address && <div className="error-message">{formErrors.address}</div>}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input 
                      type="text" 
                      id="city" 
                      name="city" 
                      value={formData.city}
                      onChange={handleChange}
                      className={formErrors.city ? 'error' : ''}
                    />
                    {formErrors.city && <div className="error-message">{formErrors.city}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="postalCode">Postal Code *</label>
                    <input 
                      type="text" 
                      id="postalCode" 
                      name="postalCode" 
                      value={formData.postalCode}
                      onChange={handleChange}
                      className={formErrors.postalCode ? 'error' : ''}
                    />
                    {formErrors.postalCode && <div className="error-message">{formErrors.postalCode}</div>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="country">Country *</label>
                  <select 
                    id="country" 
                    name="country" 
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Japan">Japan</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Delivery Method *</label>
                  <div className="delivery-options">
                    <div className="delivery-option">
                      <input 
                        type="radio" 
                        id="standard" 
                        name="deliveryMethod" 
                        value="standard"
                        checked={formData.deliveryMethod === 'standard'}
                        onChange={handleDeliveryChange}
                      />
                      <label htmlFor="standard">
                        <div className="delivery-option-title">Standard Delivery</div>
                        <div className="delivery-option-info">
                          <span className="delivery-price">$15.00</span>
                          <span className="delivery-time">3-5 business days</span>
                        </div>
                      </label>
                    </div>
                    
                    <div className="delivery-option">
                      <input 
                        type="radio" 
                        id="express" 
                        name="deliveryMethod" 
                        value="express"
                        checked={formData.deliveryMethod === 'express'}
                        onChange={handleDeliveryChange}
                      />
                      <label htmlFor="express">
                        <div className="delivery-option-title">Express Delivery</div>
                        <div className="delivery-option-info">
                          <span className="delivery-price">$35.00</span>
                          <span className="delivery-time">1-2 business days</span>
                        </div>
                      </label>
                    </div>
                    
                    <div className="delivery-option">
                      <input 
                        type="radio" 
                        id="overnight" 
                        name="deliveryMethod" 
                        value="overnight"
                        checked={formData.deliveryMethod === 'overnight'}
                        onChange={handleDeliveryChange}
                      />
                      <label htmlFor="overnight">
                        <div className="delivery-option-title">Overnight Delivery</div>
                        <div className="delivery-option-info">
                          <span className="delivery-price">$50.00</span>
                          <span className="delivery-time">Next business day</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="checkout-section">
                <h2>Payment Method</h2>
                <div className="payment-methods">
                  <div className="payment-method">
                    <input 
                      type="radio" 
                      id="credit" 
                      name="paymentMethod" 
                      value="credit"
                      checked={formData.paymentMethod === 'credit'}
                      onChange={handlePaymentChange}
                    />
                    <label htmlFor="credit">
                      <div className="payment-method-title">Credit / Debit Card</div>
                      <div className="payment-icons">
                        <span className="payment-icon">💳 Visa</span>
                        <span className="payment-icon">💳 Mastercard</span>
                        <span className="payment-icon">💳 Amex</span>
                      </div>
                    </label>
                  </div>
                  
                  <div className="payment-method">
                    <input 
                      type="radio" 
                      id="paypal" 
                      name="paymentMethod" 
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handlePaymentChange}
                    />
                    <label htmlFor="paypal">
                      <div className="payment-method-title">PayPal</div>
                      <div className="payment-info">You will be redirected to PayPal to complete your purchase</div>
                    </label>
                  </div>
                  
                  <div className="payment-method">
                    <input 
                      type="radio" 
                      id="bank" 
                      name="paymentMethod" 
                      value="bank"
                      checked={formData.paymentMethod === 'bank'}
                      onChange={handlePaymentChange}
                    />
                    <label htmlFor="bank">
                      <div className="payment-method-title">Bank Transfer</div>
                      <div className="payment-info">Payment instructions will be sent to your email</div>
                    </label>
                  </div>
                </div>
                
                {formData.paymentMethod === 'credit' && (
                  <div className="credit-card-form">
                    <div className="form-group">
                      <label htmlFor="cardNumber">Card Number *</label>
                      <input 
                        type="text" 
                        id="cardNumber" 
                        name="cardNumber" 
                        placeholder="XXXX XXXX XXXX XXXX"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className={formErrors.cardNumber ? 'error' : ''}
                        maxLength="19"
                      />
                      {formErrors.cardNumber && <div className="error-message">{formErrors.cardNumber}</div>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="cardName">Name on Card *</label>
                      <input 
                        type="text" 
                        id="cardName" 
                        name="cardName" 
                        value={formData.cardName}
                        onChange={handleChange}
                        className={formErrors.cardName ? 'error' : ''}
                      />
                      {formErrors.cardName && <div className="error-message">{formErrors.cardName}</div>}
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="expiryDate">Expiry Date (MM/YY) *</label>
                        <input 
                          type="text" 
                          id="expiryDate" 
                          name="expiryDate" 
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          className={formErrors.expiryDate ? 'error' : ''}
                          maxLength="5"
                        />
                        {formErrors.expiryDate && <div className="error-message">{formErrors.expiryDate}</div>}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="cvv">CVV *</label>
                        <input 
                          type="text" 
                          id="cvv" 
                          name="cvv" 
                          placeholder="XXX"
                          value={formData.cvv}
                          onChange={handleChange}
                          className={formErrors.cvv ? 'error' : ''}
                          maxLength="4"
                        />
                        {formErrors.cvv && <div className="error-message">{formErrors.cvv}</div>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="order-actions">
                <button type="button" className="back-button" onClick={() => setActivePage('home')}>
                  Continue Shopping
                </button>
                <button type="submit" className="place-order-button">
                  Place Order
                </button>
              </div>
            </form>
          </div>
          
          <div className="order-summary-container">
            <div className="order-summary">
              <h2>Order Summary</h2>
              
              <div className="cart-items-summary">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item-summary">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                      <span className="item-quantity">{item.quantity}</span>
                    </div>
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-specs">
                        {item.carats} Carats | {item.clarity} | {item.color}
                      </p>
                    </div>
                    <div className="item-price">${(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                ))}
              </div>
              
              <div className="price-breakdown">
                <div className="price-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="price-row">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="price-row">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="price-row total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="secure-checkout-info">
                <div className="secure-icon">🔒</div>
                <p>Your transaction is secured with SSL encryption. Your data is protected.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

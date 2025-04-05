import React, { useState } from 'react';

const RegisterPage = ({ setActivePage }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form
    const errors = {};
    
    if (!formData.firstName) {
      errors.firstName = 'First name is required';
    }
    
    if (!formData.lastName) {
      errors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!agreeTerms) {
      errors.agreeTerms = 'You must agree to the terms of service';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Here you would typically make an API call to register the user
    console.log('Registration form submitted:', { ...formData, agreeTerms });
    
    // Simulate successful registration for now
    alert('Registration successful!');
    setActivePage('home');
  };

  return (
    <div className="auth-page register-page">
      <div className="auth-container">
        <div className="auth-form-container">
          <h2 className="auth-title">Create Your Account</h2>
          <p className="auth-subtitle">Join DiamondWord to explore our premium collection</p>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  value={formData.firstName}
                  onChange={handleChange}
                  className={formErrors.firstName ? 'error' : ''}
                  placeholder="Your first name"
                />
                {formErrors.firstName && <div className="error-message">{formErrors.firstName}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName" 
                  value={formData.lastName}
                  onChange={handleChange}
                  className={formErrors.lastName ? 'error' : ''}
                  placeholder="Your last name"
                />
                {formErrors.lastName && <div className="error-message">{formErrors.lastName}</div>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                className={formErrors.email ? 'error' : ''}
                placeholder="Your email"
              />
              {formErrors.email && <div className="error-message">{formErrors.email}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={formData.password}
                onChange={handleChange}
                className={formErrors.password ? 'error' : ''}
                placeholder="••••••••"
              />
              {formErrors.password && <div className="error-message">{formErrors.password}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                value={formData.confirmPassword}
                onChange={handleChange}
                className={formErrors.confirmPassword ? 'error' : ''}
                placeholder="••••••••"
              />
              {formErrors.confirmPassword && <div className="error-message">{formErrors.confirmPassword}</div>}
            </div>
            
            <div className="form-checkbox">
              <input 
                type="checkbox" 
                id="agreeTerms" 
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
                className={formErrors.agreeTerms ? 'error' : ''}
              />
              <label htmlFor="agreeTerms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
              {formErrors.agreeTerms && <div className="error-message">{formErrors.agreeTerms}</div>}
            </div>
            
            <button type="submit" className="auth-button">Create Account</button>
            
            <div className="auth-alt-option">
              Already have an account? <a href="#" onClick={(e) => {e.preventDefault(); setActivePage('login');}}>Sign In</a>
            </div>
          </form>
        </div>
        
        <div className="auth-image">
          <div className="auth-overlay">
            <div className="auth-content">
              <h2>Experience Luxury</h2>
              <p>Create an account to access exclusive diamond collections and personalized recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

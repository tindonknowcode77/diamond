import React, { useState } from 'react';

const LoginPage = ({ setActivePage }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
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

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Here you would typically make an API call to authenticate the user
    console.log('Login form submitted:', { ...formData, rememberMe });
    
    // Simulate successful login for now
    alert('Login successful!');
    setActivePage('home');
  };

  return (
    <div className="auth-page login-page">
      <div className="auth-container">
        <div className="auth-form-container">
          <h2 className="auth-title">Sign In to Your Account</h2>
          <p className="auth-subtitle">Welcome back! Please enter your details</p>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                className={formErrors.email ? 'error' : ''}
                placeholder="Enter your email"
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
            
            <div className="form-row between">
              <div className="form-checkbox">
                <input 
                  type="checkbox" 
                  id="remember" 
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
            
            <button type="submit" className="auth-button">Sign In</button>
            
            <div className="auth-alt-option">
              Don't have an account? <a href="#" onClick={(e) => {e.preventDefault(); setActivePage('register');}}>Sign Up</a>
            </div>
          </form>
        </div>
        
        <div className="auth-image">
          <div className="auth-overlay">
            <div className="auth-content">
              <h2>Welcome to DiamondWord</h2>
              <p>Experience luxury and elegance with our premium diamond collection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

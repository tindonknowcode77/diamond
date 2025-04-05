import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this data to a server
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Reach out to us with any questions or inquiries.</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-section">
            <h3>Visit Our Showroom</h3>
            <p>123 Diamond Street</p>
            <p>New York, NY 10001</p>
            <p>United States</p>
          </div>
          
          <div className="contact-section">
            <h3>Opening Hours</h3>
            <p>Monday - Friday: 9am - 7pm</p>
            <p>Saturday: 10am - 5pm</p>
            <p>Sunday: Closed</p>
          </div>
          
          <div className="contact-section">
            <h3>Get In Touch</h3>
            <p>Phone: +1 (234) 567-890</p>
            <p>Email: info@diamondword.com</p>
          </div>
        </div>
        
        <div className="contact-form-container">
          {formSubmitted ? (
            <div className="form-success">
              <h3>Thank You!</h3>
              <p>Your message has been sent. We'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

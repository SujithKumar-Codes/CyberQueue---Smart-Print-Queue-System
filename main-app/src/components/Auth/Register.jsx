import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import "/src/styles/auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log(formData);
  };

  return (
    <div className="background-overlay">
      <div className="login-container">
        <div className="login-box">
          <h2>Create Account</h2>
          <p>Join our community</p>
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input 
                type="text" 
                name="name"
                required 
                value={formData.name}
                onChange={handleChange}
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Full Name</label>
            </div>
            
            <div className="input-group">
              <input 
                type="email" 
                name="email"
                required 
                value={formData.email}
                onChange={handleChange}
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Email</label>
            </div>
            
            <div className="input-group">
              <input 
                type="password" 
                name="password"
                required 
                value={formData.password}
                onChange={handleChange}
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Password</label>
            </div>
            
            <div className="input-group">
              <input 
                type="password" 
                name="confirmPassword"
                required 
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Confirm Password</label>
            </div>
            
            <button type="submit" className="submit-btn">
              <span>Register</span>
              <div className="liquid"></div>
            </button>
            
            <div className="footer-links">
              <Link to="/">Back to Home</Link>
              <Link to="/login">Already have an account?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
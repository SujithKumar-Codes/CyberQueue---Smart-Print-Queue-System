import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth } from '/src/firebase'; // Adjust path as needed
import { signInWithEmailAndPassword } from 'firebase/auth';
import "/src/styles/auth.css";
// import { FormUpload } from './components/Dashboard/FormUpload';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      // Sign in with Firebase
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/upload'); // Redirect after successful login
    } catch (error) {
      console.error('Login error:', error);
      setError(getFirebaseErrorMessage(error.code));
    } finally {
      setIsLoading(false);
    }
  };

  // Convert Firebase error codes to user-friendly messages
  const getFirebaseErrorMessage = (code) => {
    switch (code) {
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/user-disabled':
        return 'This account has been disabled';
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/too-many-requests':
        return 'Too many attempts. Try again later';
      default:
        return 'Login failed. Please try again';
    }
  };

  return (
    <div className="background-overlay">
      <div className="login-container">
        <div className="login-box">
          <h2>Welcome Back</h2>
          <p>Login to your account</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Email</label>
            </div>
            
            <div className="input-group">
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Password</label>
            </div>
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              <span>{isLoading ? 'Logging in...' : 'Login'}</span>
              <div className="liquid"></div>
            </button>
            
            <div className="footer-links">
              <Link to="/">Back to Home</Link>
              <Link to="/register">Create Account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
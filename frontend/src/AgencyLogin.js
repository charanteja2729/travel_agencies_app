import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './AgencyLogin.css';

const API_BASE = process.env.REACT_APP_API_URL;
function AgencyLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Updated API endpoint
      const response = await axios.post('https://travel-agencies-app.onrender.com/api/agencies/login', {
        email,
        password,
      });
      setMessage(response.data.message);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('agencyEmail', response.data.email); // Changed key
      localStorage.setItem('agencyName', response.data.agencyName); // Changed key
      navigate('/agency-dashboard'); // Updated route
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <div className="owner-login-container">
      <h2>Agency Login</h2>
      <form onSubmit={handleLogin} className="owner-login-form">
        <div className="blinking-ball"></div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      {message && <p className="owner-login-message">{message}</p>}
      
      <p>
        <p>‎ </p>
        Don't have an account? <Link to="/agencysignup">Sign up here</Link>
      </p>
    </div>
  );
}

export default AgencyLogin;
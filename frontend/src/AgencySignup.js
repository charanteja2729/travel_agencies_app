import React, { useState } from 'react';
import axios from 'axios';
import './AgencySignup.css';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

function AgencySignup() {
  const navigate = useNavigate(); // 2. Initialize the navigate function

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [address, setAddress] = useState('');
  const [contactHours, setContactHours] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [agencyImage, setAgencyImage] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/agencies/signup', {
        email,
        password,
        agencyName,
        address,
        contactHours,
        specialty,
        agencyImage,
      });

      // 3. Add the redirect logic after a successful signup
      setMessage(response.data.message + " Redirecting to login...");

      // Set a timer to redirect after showing the success message
      setTimeout(() => {
        navigate('/agencylogin');
      }, 2000); // Redirect after 2 seconds

    } catch (error) {
      setMessage(error.response?.data?.message || 'Error signing up');
    }
  };

  return (
    <div className="owner-signup-container">
      <form className="owner-signup-form" onSubmit={handleSignup}>
        <div className="blinking-ball"></div>
        <h2>Agency Signup</h2>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Agency Name:</label>
          <input type="text" value={agencyName} onChange={(e) => setAgencyName(e.target.value)} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label>Contact Hours:</label>
          <input type="text" value={contactHours} onChange={(e) => setContactHours(e.target.value)} />
        </div>
        <div>
          <label>Specialty (e.g., Adventure, Cultural):</label>
          <input type="text" value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
        </div>
        <div>
          <label>Agency Image URL:</label>
          <input type="text" value={agencyImage} onChange={(e) => setAgencyImage(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
        {message && <p className={`message ${message.includes('Error') ? 'error' : ''}`}>{message}</p>}
      </form>
    </div>
  );
}

export default AgencySignup;
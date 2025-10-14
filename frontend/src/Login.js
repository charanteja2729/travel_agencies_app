import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import tickGif from "./Tick.gif";

const API_BASE = process.env.REACT_APP_API_URL;
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showTick, setShowTick] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Updated API endpoint
      const response = await axios.post('https://travel-agencies-app.onrender.com/api/users/login', { email, password });
      const { token, email: userEmail } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("email", userEmail);
      setShowTick(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000); // Reduced delay for better UX
    } catch (error) {
      setMessage(error.response?.data?.message || "Error logging in");
      setShowTick(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="blinking-ball"></div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="message">{message}</p>
      {showTick && <img src={tickGif} alt="Success" className="tick-gif" />}
    </div>
  );
}

export default Login;
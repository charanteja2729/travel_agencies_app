import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import DashBoard from "./DashBoard";
import Signup from "./Signup";
import "./App.css";
import AgencyLogin from "./AgencyLogin";     
import AgencySignup from "./AgencySignup";   
import AgencyDashboard from "./AgencyDashboard"; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard/*" element={<DashBoard />} />
          <Route path="/agencylogin" element={<AgencyLogin />} />    // Updated path
          <Route path="/agencysignup" element={<AgencySignup />} />  // Updated path
          <Route path="/agency-dashboard" element={<AgencyDashboard />} /> // Updated path
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <div className="hero-section">
        <div className="overlay">
          <h1 className="logo">Wander More, Worry Less</h1>
          <h2 className="tagline">Discover the best places in INDIA</h2>
          <div className="menu-links">
            <Link to="/login" className="login-button">Log in</Link>
            <Link to="/signup" className="signup-button">Sign up</Link>
            <Link to="/agencylogin" className="owner-button">Agency</Link> {/* Updated Link */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
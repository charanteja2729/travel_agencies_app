import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Agencies from './Agencies'; // Renamed from Restaurants
import Contact from './Contact';
import './styles.css';
import './Trash.css';
import MyBookings from './MyBookings'; // Renamed from MyOrders

function DashBoard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const userEmail = localStorage.getItem('email');
  const userName = userEmail ? userEmail.split('@')[0] : "Guest";
  const user = {
    name: userName,
    profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhP1LzsEOSiEWX4xedVLb8maKpMnHCUpdtNQ&s"
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('email'); // Corrected key from userEmail
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <div className="App">
      <header>
        <div className="navbar">
          <h1 className="logo">JourneyIndia</h1>
          <nav>
            <ul>
              <li><Link to="/dashboard">Home</Link></li>
              <li><Link to="/dashboard/agencies">Explore Agencies</Link></li> {/* Updated Link */}
              <li><Link to="/dashboard/contact">Contact</Link></li>
            </ul>
          </nav>
          <div className="profile" onClick={toggleDropdown}>
            <img src={user.profileImage} alt="Profile" className="profile-image" />
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <p>{user.name}</p>
                <Link to="/dashboard/my-bookings">My Bookings</Link> {/* Updated Link */}
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="agencies" element={<Agencies />} /> {/* Updated Route */}
        <Route path="contact" element={<Contact />} />
        <Route path="my-bookings" element={<MyBookings />} /> {/* Updated Route */}
      </Routes>

      <footer>
        <p>&copy; 2025 JourneyIndia. All rights reserved.</p>
      </footer>
    </div>
  );
}

function Home() {
  return (
    <section id="hero">
      <div className="hero-content">
        <h2>Wherever you go, go with all your heart</h2>
        <p>Book now and let us handle the details while you enjoy the journey!</p>
      </div>
    </section>
  );
}

export default DashBoard;
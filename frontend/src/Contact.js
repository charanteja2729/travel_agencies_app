import React from 'react';
//import './styles.css';
import './Contact.css'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Contact = () => (
  <div class ="specific-page">
    {/* <header>
      <h1>Contact Us</h1>
    </header> */}

    <main>
      <h2>Get in Touch</h2>
      <form id="contact-form" onSubmit={(e) => {
        e.preventDefault();
        alert('Your message has been sent successfully!');
      }}>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <td><input type="text" placeholder="" id="name" name="name" required /></td>
            </tr>
            <tr>
              <th>Email</th>
              <td><input type="email" placeholder="" id="email" name="email" required /></td>
            </tr>
            <tr>
              <th>Message</th>
              <td><textarea id="message" placeholder="" name="message" rows="4" required /></td>
            </tr>
          </tbody>
        </table>

        <div className="anupam">
          <p>Visit us on </p>
          <a href="#Facebook"><FaFacebook className="icon" /> Facebook</a>
          <a href="#Instagram"><FaInstagram className="icon" /> Instagram</a>
          <a href="#X"><FaTwitter className="icon" /> Twitter</a>
          <p>Mail to </p>
          <a href="#E-Mail">TravelTourism@gmail.com</a>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </main>
{/* 
    <footer>
      <p>&copy; 2024 Train Passenger Food Ordering System</p>
    </footer> */}
  </div>
);

export default Contact;

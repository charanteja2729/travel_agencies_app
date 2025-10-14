import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        // Updated API endpoint
        const response = await axios.get('http://localhost:5000/api/bookings/my-bookings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data || []);
      } catch (error) {
        setError('Failed to fetch your bookings.');
      }
    };
    fetchBookings();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>My Bookings</h2>
      {error && <p style={styles.error}>{error}</p>}
      {bookings.length === 0 ? (
        <p style={styles.noOrders}>You have not made any bookings yet.</p>
      ) : (
        <ul style={styles.orderList}>
          {bookings.map((booking) => (
            <li key={booking._id} style={styles.orderItem}>
              <p style={styles.orderId}>Package: {booking.packageName}</p>
              <p>Agency: {booking.agencyName}</p>
              <p style={styles.status}>Status: {booking.status || 'Pending'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Styles remain the same
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    color: '#333',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  noOrders: {
    textAlign: 'center',
    color: '#555',
    fontSize: '18px',
  },
  orderList: {
    listStyleType: 'none',
    padding: 0,
  },
  orderItem: {
    backgroundColor: '#ffffff',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '15px',
  },
  orderId: {
    color: '#555',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  status: {
    color: '#4CAF50', // green for status
    fontSize: '15px',
    fontStyle: 'italic',
  }
};

export default MyBookings;
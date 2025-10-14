import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AgencyDashboard.css';
import { useNavigate } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_URL;
function AgencyDashboard() {
  const [agencyName, setAgencyName] = useState('');
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newItem, setNewItem] = useState({
    packageName: '',
    description: '',
    price: '',
    imageUrl: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // States for managing the item being edited
  const [editingItemId, setEditingItemId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  // Effect to get agencyName from localStorage
  useEffect(() => {
    const name = localStorage.getItem('agencyName');
    if (name) {
      setAgencyName(name);
    } else {
      setIsLoading(false);
    }
  }, []);

  // Effect to fetch data once agencyName is set
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!agencyName) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const packagesResponse = await axios.get(`${API_BASE}/api/agencies/packages/${agencyName}`);
        setPackages(packagesResponse.data);

        const bookingsResponse = await axios.get(`${API_BASE}/api/agencies/bookings`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(bookingsResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Could not fetch agency data.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [agencyName]);

  const handleAddPackage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE}/api/agencies/add-package`,
        { ...newItem },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setPackages([...packages, response.data.tourPackage]);
      setNewItem({ packageName: '', description: '', price: '', imageUrl: '' });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error adding package');
    }
  };

  const handleDeletePackage = async (packageId) => {
    try {
      await axios.delete(`${API_BASE}/api/agencies/package/${packageId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPackages(packages.filter(pkg => pkg._id !== packageId));
      setMessage("Package deleted successfully");
    } catch (error) {
      setMessage("Error deleting package");
    }
  };

  const handleUpdateBooking = async (bookingId) => {
    try {
      const response = await axios.put(`${API_BASE}/api/agencies/booking/${bookingId}`, 
        { status: 'completed' },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
      alert(response.data.message);
    } catch (error) {
      alert("There was an error updating the booking.");
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('agencyName');
    localStorage.removeItem('agencyEmail');
    navigate('/');
  };

  // --- Edit Mode Handlers ---
  const handleEditPackageClick = (pkg) => {
    setEditingItemId(pkg._id);
    setEditFormData({
      packageName: pkg.packageName,
      description: pkg.description,
      price: pkg.price,
      imageUrl: pkg.imageUrl
    });
  };
  
  const handleEditFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };
  
  const handleCancelEdit = () => {
    setEditingItemId(null);
  };
  
  const handleUpdatePackage = async (packageId) => {
    try {
      const response = await axios.put(
        `${API_BASE}/api/agencies/package/${packageId}`,
        editFormData,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      const updatedPackages = packages.map(p => 
        p._id === packageId ? response.data.package : p
      );
      setPackages(updatedPackages);
      setEditingItemId(null);
      setMessage('Package updated successfully!');
    } catch (error) {
      setMessage('Error updating package.');
    }
  };

  if (isLoading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}><h2>Loading Dashboard...</h2></div>;
  }
  
  return (
    <div className="owner-dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">{agencyName}</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      <h2 className="section-title">Add New Tour Package</h2>
      <form onSubmit={handleAddPackage} className="owner-dashboard-form">
        <div>
          <label>Package Name:</label>
          <input type="text" value={newItem.packageName} onChange={(e) => setNewItem({ ...newItem, packageName: e.target.value })} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} required rows="4" />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} required />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" value={newItem.imageUrl} onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })} />
        </div>
        <button type="submit">Add Package</button>
      </form>
      {message && <p className="message">{message}</p>}
      
      <h3 className="section-title">Current Packages</h3>
      {packages.length > 0 ? (
        <ul className="item-list">
          {packages.map((pkg) => (
            <li key={pkg._id}>
              {editingItemId === pkg._id ? (
                // --- EDIT VIEW ---
                <div className="edit-form">
                  <input type="text" name="packageName" value={editFormData.packageName} onChange={handleEditFormChange} />
                  <input type="number" name="price" value={editFormData.price} onChange={handleEditFormChange} />
                  <input type="text" name="imageUrl" value={editFormData.imageUrl} onChange={handleEditFormChange} placeholder="New Image URL"/>
                  <textarea name="description" value={editFormData.description} onChange={handleEditFormChange} />
                  <div className="edit-buttons">
                    <button onClick={() => handleUpdatePackage(pkg._id)} className="save-button">Save</button>
                    <button onClick={handleCancelEdit} className="cancel-button">Cancel</button>
                  </div>
                </div>
              ) : (
                // --- DISPLAY VIEW ---
                <>
                  <div className="item-info">
                    {pkg.imageUrl && <img src={pkg.imageUrl} alt={pkg.packageName} />}
                    <span>{pkg.packageName} - ₹{pkg.price}/-</span>
                  </div>
                  <div className="item-actions">
                    <button onClick={() => handleEditPackageClick(pkg)} className="edit-button">Edit</button>
                    <button onClick={() => handleDeletePackage(pkg._id)} className="delete-button">Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No packages have been added yet.</p>
      )}
      
      <h3 className="section-title">Active Bookings</h3>
      {bookings.length > 0 ? (
        <ul className="item-list">
          {bookings.map((booking) => (
            <li key={booking._id}>
              <div className="item-info">
                <h4>Booking for: {booking.packageName}</h4>
                <p>User: {booking.userEmail}</p>
                <p>Status: {booking.status}</p>
              </div>
              <button onClick={() => handleUpdateBooking(booking._id)} className="complete-button">Mark as Completed</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No current bookings.</p>
      )}
    </div>
  );
}

export default AgencyDashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AgencyDetails.css';

const API_BASE = process.env.REACT_APP_API_URL;
const AgencyDetails = ({ agencyName, onBackClick }) => {
    const [packages, setPackages] = useState([]);
    const [orderMessage, setOrderMessage] = useState(null);

    useEffect(() => {
        const fetchPackages = async () => {
            if (!agencyName) return;
            try {
                const response = await axios.get('https://travel-agencies-app.onrender.com/api/agencies/packages/${agencyName}');
                setPackages(response.data);
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };
        fetchPackages();
    }, [agencyName]);

    const handleBooking = async (packageData) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setOrderMessage('You must be logged in to book a package.');
            return;
        }
        try {
            await axios.post('https://travel-agencies-app.onrender.com/api/bookings/new', packageData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrderMessage('Package booked successfully!');
        } catch (error) {
            setOrderMessage('Error while booking. Please try again.');
        }
    };

    return (
        <div className="RestaurantDetails-container">
            <button onClick={onBackClick} style={{ marginBottom: '20px' }}>← Back to Agencies</button>

            <h2>Packages from {agencyName}</h2>
            
            {/* THIS LINE IS NOW FIXED */}
            {orderMessage && <p className={`order-message ${orderMessage.includes('Error') ? 'error' : 'success'}`}>{orderMessage}</p>}

            {packages.length > 0 ? (
                <ul className="food-items-list">
                    {packages.map((pkg) => (
                        <li key={pkg._id} className="food-item-card">
                            <img
                                src={pkg.imageUrl || 'https://via.placeholder.com/400'}
                                alt={pkg.packageName}
                            />
                            <h3>{pkg.packageName}</h3>
                            <p>{pkg.description}</p>
                            <p className="cost">Price: ₹{pkg.price}/-</p>
                            <button onClick={() => handleBooking(pkg)}>Book Now</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-items-message">No packages are currently available from this agency.</p>
            )}
        </div>
    );
};

export default AgencyDetails;
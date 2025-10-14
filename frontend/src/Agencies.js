import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AgencyDetails from './AgencyDetails';

const API_BASE = process.env.REACT_APP_API_URL;
const Agencies = () => {
  const [agencies, setAgencies] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 1. Add loading state

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/agencies`);
        setAgencies(response.data);
      } catch (error) {
        console.error('Error fetching agencies:', error);
      } finally {
        setIsLoading(false); // 2. Stop loading, whether it succeeded or failed
      }
    };
    fetchAgencies();
  }, []);

  const handleBackClick = () => {
    setSelectedAgency(null);
  };

  // 3. Show a loading message while waiting for data
  if (isLoading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}><h2>Loading Agencies...</h2></div>;
  }

  return (
    <section className="restaurant-list">
      {selectedAgency ? (
        <AgencyDetails agencyName={selectedAgency} onBackClick={handleBackClick} />
      ) : (
        <div>
          <h2>Our Partner Agencies</h2>
          {agencies.map((agency) => (
            <div 
              key={agency.agencyName} 
              onClick={() => setSelectedAgency(agency.agencyName)}
              style={{ cursor: 'pointer', marginBottom: '20px', textAlign: 'center' }}
            >
              <img 
                src={agency.agencyImage || 'https://via.placeholder.com/800x500'}
                alt={agency.agencyName} 
                width="800" 
                height="500" 
                style={{ borderRadius: '8px' }} 
              />
              <h3>{agency.agencyName}</h3>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Agencies;
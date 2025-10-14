require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const userRoutes = require('./api/routes/users');
const agencyRoutes = require('./api/routes/agencies');
const bookingRoutes = require('./api/routes/bookings'); // Add this line

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tourismAppDB')
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch((error) => console.error('MongoDB connection error:', error));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/agencies', agencyRoutes);
app.use('/api/bookings', bookingRoutes); // Add this line

// Server Initialization
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticateToken } = require('../middleware/authMiddleware');

// === Public Routes ===
// GET /api/bookings/search
router.get('/search', bookingController.searchPackages);

// === Protected User Routes ===
// POST /api/bookings/new
router.post('/new', authenticateToken, bookingController.createNewBooking);

// GET /api/bookings/my-bookings
router.get('/my-bookings', authenticateToken, bookingController.getUserBookings);

module.exports = router;
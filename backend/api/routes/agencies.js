const express = require('express');
const router = express.Router();
const agencyController = require('../controllers/agencyController');
const { authenticateToken } = require('../middleware/authMiddleware');

// === Public Routes ===
// GET /api/agencies
router.get('/', agencyController.getAllAgencies);

// GET /api/agencies/packages/:agencyName
router.get('/packages/:agencyName', agencyController.getAgencyPackages);

// === Auth Routes ===
// POST /api/agencies/signup
router.post('/signup', agencyController.signup);

// POST /api/agencies/login
router.post('/login', agencyController.login);

// === Protected Agency Routes ===
// POST /api/agencies/add-package
router.post('/add-package', authenticateToken, agencyController.addPackage);

// DELETE /api/agencies/package/:packageId
router.delete('/package/:packageId', authenticateToken, agencyController.deletePackage);

// GET /api/agencies/bookings
router.get('/bookings', authenticateToken, agencyController.getAgencyBookings);

// PUT /api/agencies/booking/:bookingId
router.put('/booking/:bookingId', authenticateToken, agencyController.updateBookingStatus);

// PUT /api/agencies/details
// Updates the logged-in agency's details
router.put('/details', authenticateToken, agencyController.updateAgencyDetails);

// PUT /api/agencies/package/:packageId
// Updates a specific package
router.put('/package/:packageId', authenticateToken, agencyController.updatePackageDetails);

module.exports = router;
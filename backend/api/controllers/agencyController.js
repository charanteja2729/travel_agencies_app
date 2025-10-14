const Agency = require('../models/agencyModel');
const TourPackage = require('../models/tourPackageModel');
const Booking = require('../models/bookingModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Agency Signup
exports.signup = async (req, res) => {
    const { email, password, agencyName, address, contactHours, specialty, agencyImage } = req.body;
    try {
        if (await Agency.findOne({ email })) {
            return res.status(400).json({ message: 'Agency with this email already exists.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAgency = new Agency({ email, password: hashedPassword, agencyName, address, contactHours, specialty, agencyImage });
        await newAgency.save();
        res.status(201).json({ message: 'Agency registered successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error during agency signup.', error });
    }
};

// Agency Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const agency = await Agency.findOne({ email });
        if (!agency || !(await bcrypt.compare(password, agency.password))) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }
        const token = jwt.sign({ email: agency.email, type: 'agency', agencyName: agency.agencyName }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful.', token, email: agency.email, agencyName: agency.agencyName });
    } catch (error) {
        res.status(500).json({ message: 'Server error during agency login.', error });
    }
};

// Get all agencies
exports.getAllAgencies = async (req, res) => {
    try {
        const agencies = await Agency.find({}, 'agencyName agencyImage specialty address');
        res.status(200).json(agencies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching agencies.', error });
    }
};

// Get all packages for a specific agency
exports.getAgencyPackages = async (req, res) => {
    try {
        const { agencyName } = req.params;
        const packages = await TourPackage.find({ agencyName });
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tour packages.', error });
    }
};


// Add a new tour package
exports.addPackage = async (req, res) => {
    if (req.user.type !== 'agency') return res.status(403).json({ message: 'Forbidden: Only agencies can add packages.' });
    const { packageName, description, price, category, imageUrl } = req.body;
    try {
        const tourPackage = new TourPackage({
            agencyName: req.user.agencyName,
            packageName, description, price, category, imageUrl
        });
        await tourPackage.save();
        res.status(201).json({ message: 'Tour package added successfully.', tourPackage });
    } catch (error) {
        res.status(500).json({ message: 'Error adding tour package.', error });
    }
};

// Delete a tour package
exports.deletePackage = async (req, res) => {
    if (req.user.type !== 'agency') return res.status(403).json({ message: 'Forbidden.' });
    try {
        const { packageId } = req.params;
        const deletedPackage = await TourPackage.findOneAndDelete({ _id: packageId, agencyName: req.user.agencyName });
        if (!deletedPackage) {
            return res.status(404).json({ message: 'Package not found or you do not have permission to delete it.' });
        }
        res.status(200).json({ message: 'Package deleted successfully.', deletedPackage });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting package.', error });
    }
};

// Get bookings for an agency
exports.getAgencyBookings = async (req, res) => {
    if (req.user.type !== 'agency') return res.status(403).json({ message: 'Forbidden.' });
    try {
        const bookings = await Booking.find({ agencyName: req.user.agencyName, status: { $ne: 'completed' } });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching agency bookings.', error });
    }
};

// Update a booking's status
exports.updateBookingStatus = async (req, res) => {
    if (req.user.type !== 'agency') return res.status(403).json({ message: 'Forbidden.' });
    try {
        const { bookingId } = req.params;
        const { status } = req.body; // Expecting new status in the body
        const updatedBooking = await Booking.findOneAndUpdate(
            { _id: bookingId, agencyName: req.user.agencyName },
            { status: status },
            { new: true }
        );
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found or not associated with your agency.' });
        }
        res.status(200).json({ message: `Booking status updated to ${status}.`, booking: updatedBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking status.', error });
    }
};


// Update Agency Details
exports.updateAgencyDetails = async (req, res) => {
    if (req.user.type !== 'agency') return res.status(403).json({ message: 'Forbidden.' });

    try {
        const updatedAgency = await Agency.findOneAndUpdate(
            { email: req.user.email }, // Find agency by the token's email
            { $set: req.body }, // Update with the data sent in the request body
            { new: true } // Return the updated document
        );

        if (!updatedAgency) {
            return res.status(404).json({ message: 'Agency not found.' });
        }
        res.status(200).json({ message: 'Agency details updated successfully.', agency: updatedAgency });

    } catch (error) {
        res.status(500).json({ message: 'Error updating agency details.', error });
    }
};

// Update Package Details
exports.updatePackageDetails = async (req, res) => {
    if (req.user.type !== 'agency') return res.status(403).json({ message: 'Forbidden.' });
    
    try {
        const { packageId } = req.params;
        const updatedPackage = await TourPackage.findOneAndUpdate(
            { _id: packageId, agencyName: req.user.agencyName }, // Ensure package belongs to the agency
            { $set: req.body },
            { new: true }
        );

        if (!updatedPackage) {
            return res.status(404).json({ message: 'Package not found or you do not have permission to edit it.' });
        }
        res.status(200).json({ message: 'Package updated successfully.', package: updatedPackage });

    } catch (error) {
        res.status(500).json({ message: 'Error updating package.', error });
    }
};
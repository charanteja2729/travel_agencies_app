const Booking = require('../models/bookingModel');
const TourPackage = require('../models/tourPackageModel');

// Route for searching/filtering packages
exports.searchPackages = async (req, res) => {
    const { category, minPrice, maxPrice } = req.query;
    try {
        const query = {};
        if (category) query.category = category;
        if (minPrice) query.price = { $gte: minPrice };
        if (maxPrice) query.price = { ...query.price, $lte: maxPrice };

        const packages = await TourPackage.find(query);
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ message: 'Error searching packages.', error });
    }
};

// Route for a user to create a new booking
exports.createNewBooking = async (req, res) => {
    if (req.user.type !== 'user') return res.status(403).json({ message: 'Forbidden: Only users can book packages.' });
    try {
        const { agencyName, packageName, price, imageUrl } = req.body;
        const newBooking = new Booking({
            userEmail: req.user.email,
            agencyName,
            packageName,
            price,
            imageUrl
        });
        await newBooking.save();
        res.status(201).json({ message: 'Package booked successfully.', booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking.', error });
    }
};

// Route for a user to view their own bookings
exports.getUserBookings = async (req, res) => {
    if (req.user.type !== 'user') return res.status(403).json({ message: 'Forbidden.' });
    try {
        const bookings = await Booking.find({ userEmail: req.user.email });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching your bookings.', error });
    }
};
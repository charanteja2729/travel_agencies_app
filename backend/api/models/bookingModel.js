const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    agencyName: { type: String, required: true },
    packageName: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' },
    userEmail: { type: String, required: true } // Links booking to a user
});

module.exports = mongoose.model('Booking', bookingSchema);
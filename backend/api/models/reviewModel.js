const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    packageName: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
const mongoose = require('mongoose');

const tourPackageSchema = new mongoose.Schema({
    agencyName: { type: String, required: true },
    packageName: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    category: { type: String, required: false },
    available: { type: Boolean, default: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    ratingCount: { type: Number, default: 0 },
    imageUrl: { type: String, required: false },
});

module.exports = mongoose.model('TourPackage', tourPackageSchema);
const mongoose = require('mongoose');

const agencySchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    agencyName: { type: String, unique: true, required: true },
    address: { type: String, required: false },
    contactHours: { type: String, required: false },
    specialty: { type: String, required: false },
    agencyImage: { type: String }
});

module.exports = mongoose.model('Agency', agencySchema);
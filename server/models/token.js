const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
        expires: 43200  //  12 hours
    }
});

module.exports = mongoose.model('Token', tokenSchema);
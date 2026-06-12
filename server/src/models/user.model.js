const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: [true, 'Phone number already exists']
    },
    fullName: {
            type: String,
            required: true
    },
    email:
    {
        type: String,
        required: true,
        unique: [true, 'Email already exists']
    },
    password:
    {
        type: String,
        required: true
    },
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
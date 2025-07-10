const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Firstname is required'],
    },
    lastname: String,
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    userType: {
        type: String,
        enum: ['guest', 'host'],
        default: 'guest',
    },
    Favourites:[{
         type: mongoose.Schema.Types.ObjectId,
            unique: true,
            ref: "Home"
    }]
})

module.exports = mongoose.model('User', userSchema);
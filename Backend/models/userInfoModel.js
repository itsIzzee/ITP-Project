    // models/userInformation.js
    const mongoose = require('mongoose');

    const userInformationSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User ',
            required: true
        },
        shippingAddress: {
            type: String,
            required: true
        },
        billingAddress: {
            type: String,
            required: true
        },
        orderHistory: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }],
        wishlist: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],
        appointmentBookingHistory: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Appointment'
        }],
        notificationPreferences: {
            email: { type: Boolean, default: true },
            sms: { type: Boolean, default: false }
        },
        loyaltyPoints: { type: Number, default: 0 },
        feedbacks: [{
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            feedback: String,
            rating: { type: Number, min: 1, max: 5 }
        }],
        productsInterested: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }]
    });

    module.exports = mongoose.model('UserInformation', userInformationSchema);
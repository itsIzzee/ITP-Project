// models/sellerInformation.js
const mongoose = require('mongoose');

const sellerInformationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User ',
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    businessAddress: {
        type: String,
        required: true
    },
    storeLocation: {
        type: String,
        required: true
    },
    businessRegistrationDetails: {
        registrationNumber: String,
        registrationDate: Date
    },
    acceptedPaymentMethods: [String],
    customerReviews: [{
        customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
        review: String,
        rating: { type: Number, min: 1, max: 5 }
    }],
    commissionFees: { type: Number, required: true },
    productTypesSelling: [String]
});

module.exports = mongoose.model('SellerInformation', sellerInformationSchema);
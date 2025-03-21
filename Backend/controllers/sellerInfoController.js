// controllers/sellerInformationController.js
const catchAsyncError = require('../middleware/catchAsyncError');
const SellerInformation = require('../models/sellerInfoModel');
const ErrorHandler = require('../Utils/errorHandling');

// Create Seller Information
exports.createSellerInfo = catchAsyncError(async (req, res, next) => {
    const sellerInfo = await SellerInformation.create({ userId: req.seller.id, ...req.body });
    res.status(201).json({ success: true, sellerInfo });
});

// Get Seller Information
exports.getSellerInfo = catchAsyncError(async (req, res, next) => {
    const sellerInfo = await SellerInformation.findOne({ userId: req.seller.id });
    if (!sellerInfo) return next(new ErrorHandler('Seller information not found', 404));
    res.status(200).json({ success: true, sellerInfo });
});

// Update Seller Information
exports.updateSellerInfo = catchAsyncError(async (req, res, next) => {
    const sellerInfo = await SellerInformation.findOneAndUpdate({ userId: req.seller.id }, req.body, { new: true, runValidators: true });
    if (!sellerInfo) return next(new ErrorHandler('Seller information not found', 404));
    res.status(200).json({ success: true, sellerInfo });
});

// Delete Seller Information
exports.deleteSellerInfo = catchAsyncError(async (req, res, next) => {
    const sellerInfo = await SellerInformation.findOne({ userId: req.seller.id });
    if (!sellerInfo) return next(new ErrorHandler('Seller information not found', 404));
     // Use the `deleteOne` method to delete the seller information
     await SellerInformation.deleteOne({ userId: req.seller.id });
    res.status(200).json({ success: true, message: 'Seller information deleted' });
});
// controllers/userInformationController.js
const catchAsyncError = require('../middleware/catchAsyncError');
const UserInformation = require('../models/userInfoModel');
const ErrorHandler = require('../Utils/errorHandling');

// Create User Information
exports.createUserInfo = catchAsyncError(async (req, res, next) => {
    const userInfo = await UserInformation.create({ userId: req.user.id, ...req.body });
    res.status(201).json({ success: true, userInfo });
});

// Get User Information
exports.getUserInfo = catchAsyncError(async (req, res, next) => {
    const userInfo = await UserInformation.findOne({ userId: req.user.id });
    if (!userInfo) return next(new ErrorHandler('User  information not found', 404));
    res.status(200).json({ success: true, userInfo });
});

// Update User Information
exports.updateUserInfo = catchAsyncError(async (req, res, next) => {
    const userInfo = await UserInformation.findOneAndUpdate({ userId: req.user.id }, req.body, { new: true, runValidators: true });
    if (!userInfo) return next(new ErrorHandler('User  information not found', 404));
    res.status(200).json({ success: true, userInfo });
});

// Delete User Information
exports.deleteUserInfo = catchAsyncError(async (req, res, next) => {
    const userInfo = await UserInformation.findOne({ userId: req.user.id });
    if (!userInfo) return next(new ErrorHandler('User  information not found', 404));
     // Use the `deleteOne` method instead of `remove`
     await UserInformation.deleteOne({ userId: req.user.id });
    
    res.status(200).json({ success: true, message: 'User  information deleted' });
});
const ErrorHandler = require("../Utils/errorHandling");
const User = require('../models/userModel');
const Seller = require('../models/sellerModel');
const catchAsyncError = require("./catchAsyncError");
const jwt  = require('jsonwebtoken')


exports.isAuthenticatedUser = catchAsyncError(async (req , res , next) => {
    const { token } = req.cookies;

    if(!token){
        return next(new ErrorHandler('Login First to handle this resource',401))
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET)
    req.user =   await User.findById(decoded.id) 

    
    if (!req.user) {
        return next(new ErrorHandler("User not found", 404)); // ✅ Handle invalid token case
    }

    next();

   
})


exports.isAuthenticatedSeller = catchAsyncError(async (req , res , next) => {
    const { token } = req.cookies;

    if(!token){
        return next(new ErrorHandler('Login First to handle this resource',401))
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET)
    req.seller =  await Seller.findById(decoded.id) 
    next();

   
})

exports.authorizeRoles = (...roles) => {
   return  (req , res , next) => {
    if(!roles.includes(req.user.role)){
        return next(new ErrorHandler(`Role ${req.user.role} not allowed`,401))
    }
     next()
    }
}


exports.authorizeRolesSeller = (...roles) => {
    return  (req , res , next) => {
     if(!roles.includes(req.seller.role)){
         return next(new ErrorHandler(`Seller ${req.seller.role} not allowed`,401))
     }
      next()
     }
 }
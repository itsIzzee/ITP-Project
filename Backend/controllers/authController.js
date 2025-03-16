const catchAsyncError = require('../middleware/catchAsyncError')
const User = require('../models/userModel')
const errorHandler = require('../Utils/errorHandling')
const sendToken = require('../Utils/jwt')

exports.registerUser = catchAsyncError(async (req,res,next) =>{

    const {name,email,password,avatar} = req.body
    const user = await User.create({
        name,
        email,
        password,
        avatar
    });

    sendToken(user,201,res)

})



exports.loginuser = catchAsyncError(async(req,res,next) =>{
    const{email,password} = req.body

    if(!email || !password){
        return next(new errorHandler('Please Enter email & password',400))
    }


    //finding data of user in the db

    const user = await User.findOne({email}).select('+password');

    if(!user){
        return next(new errorHandler('Invalid email or password',401))
    }

    if(!await user.isValidPassword(password)){
        return next(new errorHandler('Invalid email or password',401))
    }

    sendToken(user, 201, res)

})

exports.logoutUser = (req ,res ,next ) => {
        
}
const catchAsyncError = require('../middleware/catchAsyncError')
const User = require('../models/userModel')
const sendEmail = require('../Utils/email')
const ErrorHandler = require('../Utils/errorHandling')
const errorHandler = require('../Utils/errorHandling')
const sendToken = require('../Utils/jwt')
const crypto = require ('crypto')



//Register User - /api/v1/register
exports.registerUser = catchAsyncError(async (req,res,next) =>{

    const {name,email,password,shippingAddress,billingAddress,wishlist,notificationPreferences,feedbacks,
            productsInterested
    } = req.body

    let avatar;
    if(req.file){
        avatar = `${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`
    }

    const user = await User.create({
        name,
        email,
        password,
        avatar,shippingAddress,billingAddress,wishlist,notificationPreferences,feedbacks,
        productsInterested
        
    });

    sendToken(user,201,res)

})
//Register User Info- /api/v1/registerUserInfo
// exports.registerUserInfo = catchAsyncError(async (req,res,next) =>{
//     let newUserData = {
//     shippingAddress: req.body.shippingAddress,
//     billingAddress: req.body.billingAddress,
//     wishlist: req.body.wishlist,
//     notificationPreferences: req.body.notificationPreferences,
//     feedbacks: req.body.feedbacks,
//     productsInterested: req.body.productsInterested
// };

// const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
//     new: true,
//     runValidators: true
// });

//     if (!user) {
//         return res.status(404).json({
//             success: false,
//             message: 'User not found',
//         });
//     }

//     res.status(200).json({
//         success: true,
//         message: 'User information updated successfully',
//         user,
//     });

// })



//Login User - /api/v1/login
exports.loginuser = catchAsyncError(async(req,res,next) =>{
    const{email,password} = req.body

    if(!email || !password){
        return next(new errorHandler('Please Enter email & password',400))
    }


    //finding data of user in the db

    const user = await User.findOne({email}).select('+password');

    if(!user){
        return next(new errorHandler('Please enter email or password',401))
    }

    if(!await user.isValidPassword(password)){
        return next(new errorHandler('Invalid email or password',401))
    }

        sendToken(user, 201, res)

           


})

exports.initiate2FA = catchAsyncError(async (req, res, next) => {
    // Ensure user is authenticated and available
    if (!req.user || !req.user._id) {
        return next(new ErrorHandler('User authentication required', 401));
    }

    // Get fresh user document to ensure all methods are available
    const user = await User.findById(req.user._id);
    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    // Generate and save 2FA code
    const code = crypto.randomInt(100000, 999999).toString();
    user.twoFACode = code;
    user.twoFAExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    user.is2FAVerified = false;
    
    await user.save({ validateBeforeSave: false });

    // Send email
    try {
        await sendEmail({
            email: user.email,
            subject: 'Your 2FA Verification Code',
            message: `Your verification code is: ${code}`
        });

        res.status(200).json({
            success: true,
            message: '2FA code sent to your email'
        });
    } catch (error) {
        // Clear the code if email fails
        user.twoFACode = undefined;
        user.twoFAExpires = undefined;
        await user.save({ validateBeforeSave: false });
        
        return next(new ErrorHandler('Failed to send verification email', 500));
    }
});

exports.verify2FA = catchAsyncError(async (req, res, next) => {
    const { code } = req.body;
    
    // Validate input
    if (!code || !/^\d{6}$/.test(code)) {
        return next(new ErrorHandler('Please provide a valid 6-digit code', 400));
    }

    // Get fresh user document
    const user = await User.findById(req.user._id);
    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    // Verify code
    if (!user.twoFACode || code !== user.twoFACode || Date.now() > user.twoFAExpires) {
        return next(new ErrorHandler('Invalid or expired verification code', 400));
    }

    // Clear code and mark as verified
    user.twoFACode = undefined;
    user.twoFAExpires = undefined;
    user.is2FAVerified = true;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: '2FA verification successful',
        user
    });
});
//Logout User - /api/v1/logout
exports.logoutUser = (req ,res ,next ) => {
        res.cookie('token',null, {
            expires : new Date(Date.now()),
            httpOnly : true
        })
        .status(200)
        .json({
            success : true ,
            message : "Logged out"
        })

}


//forgot Password - /api/v1/password/forgot
exports.forgotPassword = catchAsyncError (async (req , res, next)=> {
   const user =  await User.findOne({email : req.body.email})

   if(!user){
    return next(new ErrorHandler('User not found with this mail',404))
   }
   const resetToken = await user.getResetToken();
   await user.save({validateBeforeSave: false})

   //create reset url using reset token
   const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`
   const message = `Your password reset url is as follows  \n\n ${resetUrl}  \n\n If you have not requested this E-mail then Ignore it`

   try{
    sendEmail({
        email: user.email,
        subject :'Rootsly Password Recovery',
        message 

    })
    res.status(200).json({
        success:true,
        message : `Email Sent to ${user.email}`
    })

   }catch(error){
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined
    await user.save({validateBeforeSave: false})
    next(new ErrorHandler(error.message),500)

   }
})


//Reset Password - /api/v1/password/reset/:token
exports.resetPassword = catchAsyncError( async (req , res, next)=>  {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire : {
            $gt : Date.now()
        }

    })

    if (!user){
        return next(new ErrorHandler('Password reset token is invalid or expired '))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not matched',401))
    }

    user.password = req.body.password 
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({validateBeforeSave : false})

    sendToken(user, 201, res)
})

//Get user profile - /api/v1/myprofile
exports.getUserProfile = catchAsyncError(async(req , res, next)=> {
   const user = await User.findById(req.user.id)
   

   res.status(200).json({
    success : true,
    user
   })
})


//change password - /api/v1/login
exports.changePassword = catchAsyncError(async (req , res, next)=>{
    const user = await User.findById(req.user.id).select('+password');

    req.body.oldPassword
    //check old password
    if(!await user.isValidPassword(req.body.oldPassword)){
        return next(new ErrorHandler('Old Password is incorrect',401))
    }


    //assigning new password
    user.password = req.body.password;
    await user.save();

    res.status(200).json({
        success : true
        
       })
})



//update profile
exports.updateProfile = catchAsyncError(async (req , res, next)=>{

    let newUserData = {
        name : req.body.name,
        email : req.body.email,
        shippingAddress : req.body.shippingAddress,
        billingAddress : req.body.billingAddress,
        wishlist : req.body.wishlist,
        notificationPreferences : req.body.notificationPreferences,
        feedbacks : req.body.feedbacks,
        productsInterested : req.body.productsInterested,
    }

    let avatar;
    if(req.file){
        avatar = `${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`
        newUserData =   {...newUserData,avatar}
    }

   const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new : true,
        runValidators :true 

    })


    res.status(200).json({
        success : true,
        user
       })


})




// Delete My Account - /api/v1/myaccount
exports.deleteMyAccount = catchAsyncError(async (req, res, next) => {
    // Find the user by their ID
    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new ErrorHandler('User  not found', 404));
    }

    

    // Delete the user account
    await user.deleteOne();



    res.status(200).json({
        success: true,
        message: 'Your account has been deleted successfully'
    });
});


//admin roles

//admin:get all users - /api/v1/admin/users

exports.getAllUsers = catchAsyncError(async (req , res, next)=>{
    
    
    const users = await User.find ();

    res.status(200).json({
        success : true,
        users
       })

})

//admin : get specific user  - /api/v1/admin/user/:id

exports.getUser = catchAsyncError(async (req , res, next)=>{
    
    const user = await User.findById (req.params.id);

    if(!user){
        return next(new ErrorHandler(`User Not Found with this id ${req.params.id} ` ,401))

    }
    res.status(200).json({
        success : true,
        user
       })

})


//admin : Update user -  /api/v1/admin/user/:id

exports.updateUser = catchAsyncError(async (req , res, next)=>{
    
    const newUserData = {
        name : req.body.name,
        email : req.body.email,
        role : req.body.role

    }


   const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new : true,
        runValidators :true 

    })


    res.status(200).json({
        success : true,
        user
       })

})

//admin : delete user -  /api/v1/admin/user/:id
exports.deleteUser  = catchAsyncError(async (req , res, next)=>{
    
    const user = await User.findById (req.params.id);

    if(!user){
        return next(new ErrorHandler(`User Not Found with this id ${req.params.id} ` ,401))

    }

    await user.deleteOne();

    res.status(200).json({
        success : true,
        
       })

})

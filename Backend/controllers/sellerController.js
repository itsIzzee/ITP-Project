const catchAsyncError = require('../middleware/catchAsyncError')
const Seller = require('../models/sellerModel')
const sendEmail = require('../Utils/email')
const ErrorHandler = require('../Utils/errorHandling')
const errorHandler = require('../Utils/errorHandling')
const sendToken = require('../Utils/jwt')
const sendTokenSeller = require('../Utils/jwtSeller')
const crypto = require ('crypto')



//Register seller - /api/v1/registerSeller
exports.registerSeller = catchAsyncError(async (req,res,next) =>{

    const {name,email,password} = req.body


    let avatar;
    if(req.file){
        avatar = `${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`
    }
    const seller = await Seller.create({
        name,
        email,
        password,
        avatar
    });

    sendTokenSeller(seller,201,res)

})



//Login Seller - /api/v1/loginSeller
exports.loginSeller = catchAsyncError(async(req,res,next) =>{
    const{email,password} = req.body

    if(!email || !password){
        return next(new errorHandler('Please Enter email & password',400))
    }


    //finding data of user in the db

    const seller = await Seller.findOne({email}).select('+password');

    if(!seller){
        return next(new errorHandler('Invalid email or password',401))
    }

    if(!await seller.isValidPassword(password)){
        return next(new errorHandler('Invalid email or password',401))
    }

    sendTokenSeller(seller, 201, res)

})



//Logout User - /api/v1/logoutSeller
exports.logoutSeller = (req ,res ,next ) => {
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




//forgot Password - /api/v1/password/forgotSeller
exports.forgotPasswordSeller = catchAsyncError (async (req , res, next)=> {
   const seller =  await Seller.findOne({email : req.body.email})

   if(!seller){
    return next(new ErrorHandler('Seller not found with this mail',404))
   }
   const resetToken = await seller.getResetToken();
   await seller.save({validateBeforeSave: false})

   //create reset url using reset token
   const resetUrl = `${process.env.FRONTEND_URL}/password/resetSeller/${resetToken}`
   const message = `Your password reset url is as follows  \n\n ${resetUrl}  \n\n If you have not requested this E-mail then Ignore it`

   try{
    sendEmail({
        email: seller.email,
        subject :'Rootsly Password Recovery',
        message 

    })
    res.status(200).json({
        success:true,
        message : `Email Sent to ${seller.email}`
    })

   }catch(error){
    seller.resetPasswordToken = undefined;
    seller.resetPasswordTokenExpire = undefined
    await seller.save({validateBeforeSave: false})
    next(new ErrorHandler(error.message),500)

   }
})


//Reset Password - /api/v1/password/resetSeller/:token
exports.resetPasswordSeller = catchAsyncError( async (req , res, next)=>  {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const seller = await Seller.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire : {
            $gt : Date.now()
        }

    })

    if (!seller){
        return next(new ErrorHandler('Password reset token is invalid or expired '))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not matched',401))
    }

    seller.password = req.body.password 
    seller.resetPasswordToken = undefined;
    seller.resetPasswordTokenExpire = undefined;
    await seller.save({validateBeforeSave : false})

    sendTokenSeller(seller, 201, res)
})


//Get user profile - /api/v1/myprofileSeller
exports.getSellerProfile = catchAsyncError(async(req , res, next)=> {
   const seller = await Seller.findById(req.seller.id)

   res.status(200).json({
    success : true,
    seller
   })
})


//change password seller - /api/v1/password/changeSeller
exports.changePasswordSeller = catchAsyncError(async (req , res, next)=>{
    const seller = await Seller.findById(req.seller.id).select('+password');

    req.body.oldPassword
    //check old password
    if(!await seller.isValidPassword(req.body.oldPassword)){
        return next(new ErrorHandler('Old Password is incorrect',401))
    }


    //assigning new password
    seller.password = req.body.password;
    await seller.save();

    res.status(200).json({
        success : true
        
       })
})



//update profile seller
exports.updateProfileSeller = catchAsyncError(async (req , res, next)=>{

    let newSellerData = {
        name : req.body.name,
        email : req.body.email,

    }

    let avatar;
    if(req.file){
        avatar = `${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`
        newSellerData =   {...newSellerData ,avatar}
    }


   const seller = await Seller.findByIdAndUpdate(req.seller.id, newSellerData, {
        new : true,
        runValidators :true 

    })


    res.status(200).json({
        success : true,
        seller
       })


})

// Delete My Account - /api/v1/myaccountSeller
exports.deleteMyAccountSeller = catchAsyncError(async (req, res, next) => {
    // Find the seller by their ID
    const seller = await Seller.findById(req.seller.id);

    if (!seller) {
        return next(new ErrorHandler('Seller not found', 404));
    }

    // Delete the seller account
    await seller.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Your account has been deleted successfully'
    });
});



//admin:get all selllers - /api/v1/admin/seller

exports.getAllSellers = catchAsyncError(async (req , res, next)=>{
    
    
    const sellers = await Seller.find ();

    res.status(200).json({
        success : true,
        sellers
       })

})




//admin : get specific seller  - /api/v1/admin/seller/:id

exports.getSeller = catchAsyncError(async (req , res, next)=>{
    
    const seller = await Seller.findById (req.params.id);

    if(!seller){
        return next(new ErrorHandler(`User Not Found with this id ${req.params.id} ` ,401))

    }
    res.status(200).json({
        success : true,
        seller
       })

})


//admin : Update seller -  /api/v1/admin/seller/:id

exports.updateSeller = catchAsyncError(async (req , res, next)=>{
    
    let  newSellerData = {
        name : req.body.name,
        email : req.body.email,
        role : req.body.role

    }

    let avatar;
    if(req.file){
        avatar = `${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`
        newSellerData =   {...newSellerData,avatar}
    }


   const seller = await Seller.findByIdAndUpdate(req.params.id, newSellerData, {
        new : true,
        runValidators :true 

    })


    res.status(200).json({
        success : true,
        seller
       })

})

//admin : delete seller -  /api/v1/admin/seller/:id
exports.deleteSeller  = catchAsyncError(async (req , res, next)=>{
    
    const seller = await Seller.findById (req.params.id);

    if(!seller){
        return next(new ErrorHandler(`User Not Found with this id ${req.params.id} ` ,401))

    }

    await seller.deleteOne();

    res.status(200).json({
        success : true,
        
       })

})
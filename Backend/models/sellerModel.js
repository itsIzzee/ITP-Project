const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


const sellerSchema = new mongoose.Schema({
    name :{
        type : String,
        required : [true, 'Please enter name']
    },

    email :{
        type : String,
        required : [true, 'Please enter Email'],
        unique: true,
        validate: [validator.isEmail,'Please enter valid email address']
    },
    password :{
        type : String,
        required : [true, 'Please enter password'],
        maxlength : [6, 'Password cannot exceed 6 charecters'],
        select : false
    },
    avatar :{
        type : String
    },

    twoFACode: {
        type :String
    },

    twoFAExpires: {
        type:Date
    },

    is2FAVerified: { 
        type: Boolean, 
        default: false
     },

    role :{
        type : String,
        default : 'seller'
    },

    resetPasswordToken :{
        type : String
    },

    resetPasswordTokenExpire :{
        type : Date
    },

    createdAt :{
        type : Date,
        default: Date.now
    },

    businessName: {
        type: String,
        
    },
    businessAddress: {
        type: String,
        
    },
    storeLocation: {
        type: String,
        
    },
    businessRegistrationNo: {
        type: String,
    },
    acceptedPaymentMethods:  {
        type: String,
    },
    customerReviews:  {
        type: String,
    },
    commissionFees: { 
        type: Number
        },
    productTypesSelling:  {
        type: String,
    },

})


    sellerSchema.pre('save', async function (next){
        if(!this.isModified('password')){
            next();
        }
            this.password = await bcrypt.hash(this.password, 10)
        } )

    sellerSchema.methods.getJwtToken = function (){
        return jwt.sign({id: this.id},process.env.JWT_SECRET,{
                expiresIn : process.env.JWT_EXPRESS_TIME
            })
        }

    sellerSchema.methods.isValidPassword = async function (enteredPassword){
        return  bcrypt.compare(enteredPassword,this.password)
            }


    sellerSchema.methods.getResetToken = async function (){
        //generate token

        const token = crypto.randomBytes(20).toString('hex');

        //generate hash and set to resetPasswordToken 
        this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

        //set token expire time
        this.resetPasswordTokenExpire= Date.now() + 30 *60 * 1000; 

        return token;

        }

        sellerSchema.methods.generate2FACode = function() {
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            this.twoFACode = code;
            this.twoFAExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
            return code;
          };
          
          sellerSchema.methods.clear2FACode = function() {
            this.twoFACode = undefined;
            this.twoFAExpires = undefined;
            return this.save({ validateBeforeSave: false });
          };
          
          sellerSchema.methods.verify2FACode = function(code) {
            return this.twoFACode === code && Date.now() < this.twoFAExpires;
          };



let model = mongoose.model('Seller', sellerSchema);

module.exports = model;
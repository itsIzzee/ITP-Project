const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


const userSchema = new mongoose.Schema({
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
    role :{
        type : String,
        default : 'user'
    },

    resetPasswordToken :{
        type : String
    },

    resetPasswordTokenExpire :{
        type : Date
    },

    twoFACode: {
        type :String
    },

    twoFAExpires: {
        type:Date
    },

    createdAt :{
        type : Date,
        default: Date.now
    },

    shippingAddress: {
        type: String,
         default:""
    },
    billingAddress: {
        type: String,
         default:""
    },
   
    wishlist: {
        type: String,
        default:""
    },
    
    notificationPreferences: {
        type: String,
    },
   
    feedbacks: {
        type: String,
         default:""
    },
    productsInterested: {
        type: String,
       default:""
    },

})

    userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }
        this.password = await bcrypt.hash(this.password, 10)
    } )

    userSchema.methods.getJwtToken = function (){
       return jwt.sign({id: this.id},process.env.JWT_SECRET,{
            expiresIn : process.env.JWT_EXPRESS_TIME
        })
    }

    userSchema.methods.isValidPassword = async function (enteredPassword){
       return  bcrypt.compare(enteredPassword,this.password)
    }

    userSchema.methods.getResetToken = async function (){
        //generate token

        const token = crypto.randomBytes(20).toString('hex');

        //generate hash and set to resetPasswordToken 
        this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

        //set token expire time
        this.resetPasswordTokenExpire= Date.now() + 30 *60 * 1000; 

        return token;

        }

        userSchema.methods.generate2FACode = function() {
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            this.twoFACode = code;
            this.twoFAExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
            return code;
          };
          
          userSchema.methods.clear2FACode = function() {
            this.twoFACode = undefined;
            this.twoFAExpires = undefined;
            return this.save({ validateBeforeSave: false });
          };
  


let model = mongoose.model('User', userSchema);

module.exports = model;
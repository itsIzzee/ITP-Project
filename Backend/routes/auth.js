const express = require('express');
const multer = require('multer');
const path = require  ('path')

const upload = multer({storage : multer.diskStorage({
        destination: function (req , file ,cb){
            cb(null, path.join(__dirname,'..', 'uploads/user' ))
        },
        filename : function(req,file,cb){
            cb(null, file.originalname)
        }
})})

const { registerUser, 
    loginuser,
    logoutUser, 
    forgotPassword , 
    resetPassword, 
    getUserProfile,
    changePassword,
    updateProfile,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    deleteMyAccount
} = require('../controllers/authController');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authenticate');

router.route('/register').post(upload.single('avatar'),registerUser);
router.route('/login').post(loginuser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);
router.route('/myprofile').get(isAuthenticatedUser,getUserProfile);
router.route('/password/change').put(isAuthenticatedUser,changePassword);
router.route('/update').put(isAuthenticatedUser,updateProfile);
router.route('/deleteMyAccount').delete(isAuthenticatedUser,deleteMyAccount);


// admin routes

router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getUser)
                            .put(isAuthenticatedUser,authorizeRoles('admin'),updateUser)
                            .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser);






module.exports = router;
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


const router = express.Router();
const { isAuthenticatedUser, authorizeRoles, isAuthenticatedSeller, authorizeRolesSeller } = require('../middleware/authenticate');
const { registerSeller, 
    loginSeller, 
    logoutSeller, 
    forgotPasswordSeller, 
    resetPasswordSeller, 
    getSellerProfile, 
    changePasswordSeller, 
    updateProfileSeller,
    getAllSellers,
    getSeller,
    updateSeller,
    deleteSeller,
    deleteMyAccountSeller
} = require('../controllers/sellerController');



router.route('/registerSeller').post(upload.single('avatar'),registerSeller);
router.route('/loginSeller').post(loginSeller);
router.route('/logoutSeller').get(logoutSeller);
router.route('/password/forgotSeller').post(forgotPasswordSeller);
router.route('/password/resetSeller/:token').post(resetPasswordSeller);
router.route('/myprofileSeller').get(isAuthenticatedSeller,getSellerProfile);
router.route('/password/changeSeller').put(isAuthenticatedSeller,changePasswordSeller);
router.route('/updateSeller').put(isAuthenticatedSeller,upload.single('avatar'),updateProfileSeller);
router.route('/deleteMyAccountSeller').delete(isAuthenticatedSeller,deleteMyAccountSeller);



//admin.


router.route('/admin/sellers').get(isAuthenticatedSeller,authorizeRolesSeller('admin'),getAllSellers);
router.route('/admin/seller/:id').get(isAuthenticatedSeller,authorizeRolesSeller('admin'),getSeller)
                            .put(isAuthenticatedSeller,authorizeRolesSeller('admin'),updateSeller)
                            .delete(isAuthenticatedSeller,authorizeRolesSeller('admin'),deleteSeller);













module.exports = router;
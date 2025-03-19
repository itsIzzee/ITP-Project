const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles, isAuthenticatedSeller } = require('../middleware/authenticate');
const { registerSeller, 
    loginSeller, 
    logoutSeller, 
    forgotPasswordSeller, 
    resetPasswordSeller, 
    getSellerProfile, 
    changePasswordSeller, 
    updateProfileSeller
} = require('../controllers/sellerController');



router.route('/registerSeller').post(registerSeller);
router.route('/loginSeller').post(loginSeller);
router.route('/logoutSeller').get(logoutSeller);
router.route('/password/forgotSeller').post(forgotPasswordSeller);
router.route('/password/resetSeller/:token').post(resetPasswordSeller);
router.route('/myprofileSeller').get(isAuthenticatedSeller,getSellerProfile);
router.route('/password/changeSeller').put(isAuthenticatedSeller,changePasswordSeller);
router.route('/updateSeller').put(isAuthenticatedSeller,updateProfileSeller);


//admin











module.exports = router;
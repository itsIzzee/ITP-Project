// routes/userInformationRoute.js
const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, isAuthenticatedSeller  } = require('../middleware/authenticate');
const { createUserInfo, getUserInfo, updateUserInfo, deleteUserInfo } = require('../controllers/userInfoConteoller');
const { createSellerInfo, getSellerInfo, updateSellerInfo, deleteSellerInfo } = require('../controllers/sellerInfoController');

// User Information Routes
router.route('/userInformation').post(isAuthenticatedUser , createUserInfo);
router.route('/userInformation').get(isAuthenticatedUser , getUserInfo)
                                .put(isAuthenticatedUser , updateUserInfo)
                                .delete(isAuthenticatedUser , deleteUserInfo);

// Seller Information Routes
router.route('/sellerInformation').post(isAuthenticatedSeller , createSellerInfo);
router.route('/sellerInformation').get(isAuthenticatedSeller , getSellerInfo)
                                  .put(isAuthenticatedSeller , updateSellerInfo)
                                 .delete(isAuthenticatedSeller , deleteSellerInfo);

module.exports = router;    
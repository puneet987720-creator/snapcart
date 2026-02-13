const express = require('express');
const router = express.Router();
const authController = require('../controler/authcontroler.js');

router.post('/register', authController.postregister);
router.post('/verify', authController.verifyEmail);
router.post('/reVerify', authController.reVerifyEmail);
router.post('/login', authController.postlogin);

module.exports = router;
const express = require('express');
const router = express.Router();
const otpController = require("../controllers/otpController")
// const { sendOtp, verifyOtp } = require('../controllers/otpController');


router.post('/send-otp', otpController.sendOTP);
router.post('/verify-otp', otpController.verifyOTP);

module.exports = router;

const express = require("express");
const {protect}  = require("../middleware/authMiddle")
const { login, signup, logout,updateProfile ,checkAuth,updateBio } = require("../controllers/auth.controller");


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/updateProfile", protect , updateProfile);
router.get('/check', protect,checkAuth);
router.put("/updateBio",protect,updateBio);

module.exports = router;  

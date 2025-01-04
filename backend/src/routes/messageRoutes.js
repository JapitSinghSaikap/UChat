const express = require("express");
const {protect}  = require("../middleware/authMiddle")
const {getMessages, getUsers, sendMessage } = require("../controllers/messageController");


const router = express.Router();

router.get("/users", protect, getUsers);
router.get("/:id", protect, getMessages);

router.post("/send/:id", protect, sendMessage);

exports.module = router;
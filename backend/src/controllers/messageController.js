const User = require("../models/user.model");
const Message = require("../models/messageModel");
const cloudinary = require("../lib/cloudinary");
const { getReceiverSocketId, io } = require("../lib/socket.js");


exports.getUsers = async (req, res) => {
  try {
    const loggedUser = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedUser } }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getting users", error.message);
    return res.status(500).json("Internal Server Error");
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { id: chatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: chatId },
        { senderId: chatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getting the messages: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


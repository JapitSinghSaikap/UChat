const User = require("../models/user.model");
const Message = require("../models/messageModel");

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
    const { text } = req.body;
    const { id: receiverId } = req.params; 
    const senderId = req.user._id;

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      // image: imageUrl, // Uncomment and handle image logic if needed
    });

    // Save the message to the database
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sending message", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

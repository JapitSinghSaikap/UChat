const User = require("../models/user.model");
const Message = require("../models/messageModel");

exports.getUsers = async (req,res) =>{
    try{
        const loggedUser = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedUser } }).select("-password");
        res.status(200).json(filteredUsers);
    }
    catch(error){
        console.error("Error in getting users",error.message);
        return res.status(500).json("Internal Server Error");
    }
};

exports.getMessages = async (req,res) =>{
    try {
        const { id: chatId } = req.params;
        const myId = req.user._id;

        //woh messages jismein mein sender hun ya meri id ho aur dusre mein jiske sath chat krna
        const messages = await Message.find({
          $or: [
            { senderId: myId, receiverId: chatId },
            { senderId: userChat, receiverId: myId },
          ],
        });
    
        res.status(200).json(messages);
      } catch (error) {
        console.log("Error in getting the messages: ", error.message);
        res.status(500).json({ message: "Internal server error" });
      }
};

//after learning socket io send messages wala hoga
exports.sendMessages = async (req,res) =>{
    try{
        const{content,chatId} = req.body;
        const {id:recieverId} = req.params;
        const senderId = req.user._id;

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });
        //socket io pending
        res.status(201).json(newMessage);
    }
    catch(error){
        console.error("Error in sending message",error.message);
        return res.status(500).json({message:"Internal Server Error"});
    }
};
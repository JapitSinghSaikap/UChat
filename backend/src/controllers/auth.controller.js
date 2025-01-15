const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { generateToken } = require("../lib/configtoken");
const cloudinary = require("../lib/cloudinary")

exports.signup = async (req, res) => {
    console.log("Request body received in signup route:", req.body);
    const { fullName, email, password} = req.body;


    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }

        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);  
        const hashPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashPass,
        });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
            } else {
                return res.status(400).json("Error creating user");
            }
        } catch (error) {
            console.error("Error in Signing In: ", error.message);
            return res.status(500).json({
                message: "Server error",
            });
        }
    };


    exports.login = async (req, res) => {
        const {email,password} = req.body;
        try{
            const user =  await User.findOne({email});
            
            if(!user){
                return res.status(400).json({message:"Invalid Credentials"})
            }

            const isPassCorrect = await bcrypt.compare(password,user.password);

            if(!isPassCorrect){
                return res.status(400).json({message:"Inavlid Credentials"});
            }

            generateToken(user._id,res);
            // console.log(req.user);
            return res.status(200).json({
                _id:user._id,
                fullName: user.fullName,
                email: user.email,
                profilePic: user.profilePic,
            });
        }
        catch(error){
            console.error("Error in Loging In: ", error.message);
            return res.status(500).json({
                message: "Server error",
            });
        }
    };

    //for this hm bs jo cookie di thi humne isko wo clear out krdeinge
    exports.logout = (req, res) => {
        try {
            res.cookie("jwt", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                expires: new Date(0),
            });
    
            res.status(200).json({ message: "Logged out successfully" });
        } catch (error) {
            console.error("Error in Loging Out: ", error.message);
            return res.status(500).json({
                message: "Server error",
            });
        }
    };


exports.updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    console.log("User ID:", userId);
    console.log("Profile Pic Base64 String:", profilePic);

  
    let uploadResponse;
    try {
      uploadResponse = await cloudinary.uploader.upload(profilePic);
    } catch (err) {
      console.error("Cloudinary Upload Error:", err.message);
      return res.status(500).json({ message: "Failed to upload profile picture" });
    }

   
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateProfile:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};



      exports.checkAuth = (req, res) => {
        // const user = req.user;
        try {
          res.status(200).json(req.user);//ispe json format mein data nhi ana chahiye kya
        } catch (error) {
          console.log("Error in checkAuth", error.message);
          res.status(500).json({ message: "Internal Server Error" });
        }
      };
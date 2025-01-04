const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req,res,next) =>{
    try{
         const token = req.cookies.jwt;
        //  console.log("JWT token from cookies:", req.cookies.jwt);


         if(!token){
            return res.status(401).json({message:"No Token Provided"});
         }

         const decoded = jwt.verify(token, process.env.JWT_SECRET);

         if(!decoded){
            return res.status(401).json({message:"Invalid Token"})
         }

         console.log("Decoded token:", decoded);

        const user = await User.findById(decoded.id).select("-password");

        req.user = user;
        next();
    }
    catch(error){
        console.error("Token verification failed:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {protect};
const { v2: cloudinary } = require("cloudinary");
const {config} = require("dotenv");

config();

//config jo chahiye for the use of cloudinary for images jo hum dekh payenge

cloudinary.config(
    {
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET,
    }
)

module.exports = {cloudinary};
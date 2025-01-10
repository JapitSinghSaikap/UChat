const express = require("express");
const dotenv = require("dotenv");
const {connectDB}  = require("./lib/db")
const authRoutes = require("./routes/auth.route");
const messageRoutes = require("./routes/messageRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true, 
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);


app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
  connectDB();
});

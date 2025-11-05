const dotenv=require("dotenv")// if you’re using .env
const express = require("express");
const connectDB = require("./database/db"); // import the connection function
dotenv.config(); 
const cors = require("cors");
const app = express();
const Astrologer = require("./routes/Astrologer");
const router = require("./routes/Astrologer");
const loginRouter = require("./routes/Login");
// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/user", router);
app.use("/login", loginRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port http://localhost:${PORT}`));

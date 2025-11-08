import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./database/db.js";
import express from "express";
import astroRouter from "./routes/astroRoute.js";
import logger from "./utils/logger.js";
const app = express();

app.use(express.json());


app.use("/api/astrologers", astroRouter);
connectDB(process.env.MONGO_URL);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger("info", `Server is running on port http://localhost:${PORT}`);
});

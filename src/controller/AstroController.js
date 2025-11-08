import User from "../model/Astro.js";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

// 🧩 CREATE ASTROLOGER
export const createAstrologer = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const user = await User.create({ name, email, phone, password });
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        user.token = token;
        user.password = undefined; // hide password

        logger("info", `Astrologer created successfully: ${user.name}`);
        res.status(201).json({ user, token });
    } catch (error) {
        logger("error", `Astrologer creation failed: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// 🧩 GET ALL ASTROLOGERS
export const getAstrologers = async (req, res) => {
    try {
        const users = await User.find(); // optional filter
        
        logger("info", "Fetched all astrologers successfully");
        res.status(200).json({ message: "Astrologers fetched successfully", users });
    } catch (error) {
        logger("error", `Failed to fetch astrologers: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// 🧩 GET ASTROLOGER BY ID
export const getAstrologerById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            logger("warn", `Astrologer not found for ID: ${id}`);
            return res.status(404).json({ error: "Astrologer not found" });
        }

        logger("info", `Fetched astrologer: ${user.name}`);
        res.status(200).json({ message: "Astrologer fetched successfully" });
    } catch (error) {
        logger("error", `Error fetching astrologer by ID: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// 🧩 UPDATE ASTROLOGER BY ID
export const updateAstrologer = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (!user) {
            logger("warn", `Astrologer not found for ID: ${id}`);
            return res.status(404).json({ error: "Astrologer not found" });
        }

        logger("info", `Updated astrologer: ${user.name}`);
        res.status(200).json({ message: "Astrologer updated successfully" });
    } catch (error) {
        logger("error", `Error updating astrologer by ID: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

export const deleteAstrologerById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            logger("warn", `Astrologer not found for ID: ${id}`);
            return res.status(404).json({ error: "Astrologer not found" });
        }

        logger("info", `Deleted astrologer: ${user.name}`);
        res.status(200).json({ message: "Astrologer deleted successfully" });
    } catch (error) {
        logger("error", `Error deleting astrologer by ID: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

export const deleteAllAstrologers = async (req, res) => {
    try {
        const users = await User.deleteMany();
        logger("info", "Deleted all astrologers successfully");
        res.status(200).json({ message: "All astrologers deleted successfully" });
    } catch (error) {
        logger("error", `Error deleting all astrologers: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};
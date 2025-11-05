const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Astrologer = require("../model/Astrologer");

const getAllAstrologers = async (req, res) => {
  try {
    const astrologers = await Astrologer.find();
    res.status(200).json(astrologers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createAstrologer = async (req, res) => {
  try {
    const { name, phone, password,email } = req.body;

    if (!name || !password || !phone || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if already exists
    const existing = await Astrologer.findOne({ phone,email });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Astrologer already exists with this phone number or email" });
    }

    // Create astrologer
    const astrologer = await Astrologer.create(req.body);

    // Generate JWT token
    const token = jwt.sign(
      { id: astrologer._id, phone: astrologer.phone },
      process.env.JWT_SECRET,
    );


    // Save token in DB
    astrologer.token = token;
    await astrologer.save();

    res.status(201).json({
      message: "Astrologer created successfully",
      astrologer,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAstrologerById = async (req, res) => {
  try {
    const astrologer = await Astrologer.findById(req.params.id);
    res.status(200).json(astrologer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateAstrologer = async (req, res) => {
  try {
    const astrologer = await Astrologer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(astrologer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAstrologer = async (req, res) => {
  try {
    const astrologer = await Astrologer.findByIdAndDelete(req.params.id);
    res.status(200).json(astrologer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllAstrologers,
  createAstrologer,
  getAstrologerById,
  updateAstrologer,
  deleteAstrologer,
};

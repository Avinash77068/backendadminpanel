import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // --- BASIC INFO ---
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^\+?\d{10,15}$/, "Please enter a valid phone number"],
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },

    // --- ROLE CONTROL ---
    role: {
      type: String,
      enum: ["user", "astrologer", "admin", "superadmin"],
      default: "user",
    },

    // --- ASTROLOGER-SPECIFIC FIELDS ---
    specialization: {
      type: [String],
      default: [], // e.g. ["Vedic Astrology", "Tarot Reading"]
    },
    languages: {
      type: [String],
      default: [],
    },
    experienceYears: {
      type: Number,
      min: 0,
      default: 0,
    },
    consultationFee: {
      type: Number,
      min: 0,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    totalConsultations: {
      type: Number,
      default: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
    city: {
      type: String,
      trim: true,
      default: "",
    },
    state: {
      type: String,
      trim: true,
      default: "",
    },

    // --- ADMIN-SPECIFIC CONTROLS ---
    permissions: {
      canManageUsers: { type: Boolean, default: false },
      canManageAstrologers: { type: Boolean, default: false },
      canViewReports: { type: Boolean, default: false },
      canEditSettings: { type: Boolean, default: false },
    },

    // --- AUTH & SECURITY ---
    token: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "banned"],
      default: "active",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

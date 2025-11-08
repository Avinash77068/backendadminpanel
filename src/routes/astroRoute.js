import express from "express";
import {
    createAstrologer,
    getAstrologers,
    getAstrologerById,
    deleteAstrologerById,
    deleteAllAstrologers,
    updateAstrologer,
} from "../controller/AstroController.js";
import { astrologerValidation } from "../middleware/astrologerValidation.js";

const router = express.Router();

router.get("/", getAstrologers);
router.get("/:id", getAstrologerById);
router.delete("/deleteall", deleteAllAstrologers);
router.post("/create", astrologerValidation, createAstrologer);
router.put("/:id", astrologerValidation, updateAstrologer);
router.delete("/:id", deleteAstrologerById);

export default router;

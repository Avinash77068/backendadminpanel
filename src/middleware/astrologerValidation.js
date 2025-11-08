import Joi from "joi";

const astrologerValidation = (req, res, next) => {
    const astrologerSchema = Joi.object({
        // --- BASIC INFO ---
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        phone: Joi.string()
            .pattern(/^\+?\d{10,15}$/)
            .required(),
        password: Joi.string().min(6).required(),
        profileImage: Joi.string().uri().optional() || Joi.string().optional(),
        bio: Joi.string().max(500).optional(),

        // --- ROLE CONTROL ---
        role: Joi.string()
            .valid("user", "astrologer", "admin", "superadmin")
            .default("astrologer") || Joi.string().optional(),

        // --- ASTROLOGER-SPECIFIC FIELDS ---
        specialization: Joi.array().items(Joi.string()).optional(),
        languages: Joi.array().items(Joi.string()).optional(),
        experienceYears: Joi.number().min(0).optional(),
        consultationFee: Joi.number().min(0).optional(),
        rating: Joi.number().min(0).max(5).optional(),
        totalConsultations: Joi.number().min(0).optional(),
        available: Joi.boolean().optional(),
        city: Joi.string().optional(),
        state: Joi.string().optional(),

        // --- ADMIN CONTROLS (usually not set by astrologer) ---
        permissions: Joi.object({
            canManageUsers: Joi.boolean(),
            canManageAstrologers: Joi.boolean(),
            canViewReports: Joi.boolean(),
            canEditSettings: Joi.boolean(),
        }).optional(),

        // --- AUTH & SECURITY ---
        token: Joi.string().optional(),
        isVerified: Joi.boolean().optional(),
        lastLogin: Joi.date().optional(),
        status: Joi.string()
            .valid("active", "inactive", "banned")
            .default("active"),
    });

    const { error } = astrologerSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next(); // Proceed to createAstrologer
};


export { astrologerValidation };

const express = require("express");
const authMiddleware = require("../../middleware/auth");

const authRoutes = express.Router();

authRoutes.get("/", authMiddleware, (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(200).json({ message: "Un-authorized request!", status: 500 });
    }

    return res.status(200).json({ message: "Authorized request!", user: user, status: 200 });
});

module.exports = authRoutes;
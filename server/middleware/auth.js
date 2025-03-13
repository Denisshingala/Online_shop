const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers['authorization'];

        if (null == token) {
            return res.status(200).json({ message: "Unauthorized request!", status: 401 });
        } else {
            jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY, (err, user) => {
                if (err) {
                    console.error(err);
                    return res.status(200).json({ message: "Invalid JWT token!", status: 401 });
                }
                req.user = user;
                next();
            });
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = authMiddleware;
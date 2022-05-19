const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const validateJWT = async (req, res, next) => {
    try {
        let tokenPayload;
        const authHeaders = req.headers.authorization;
        const token = authHeaders && authHeaders.split(" ")[1];
        if (!token) throw new Error("User not authorized");

        try {
            tokenPayload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                throw new Error("Session Expired! Login Again");
            } else if (err instanceof jwt.JsonWebTokenError) {
                throw new Error("Invalid Token");
            }
        }

        const user = await User.findOne({ username: tokenPayload.username });
        req.user = user;
    } catch (err) {
        next(err);
    }
    next();
};

module.exports = validateJWT;

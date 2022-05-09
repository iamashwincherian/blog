const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");

const router = express.Router();
const SALT_ROUNDS = 10;

router.get("/", (req, res) => {
    res.send({
        data: "Blog",
    });
});

// Authentication

const signUserToken = ({ username, name }) => {
    return jwt.sign({ username, name }, process.env.JWT_PRIVATE_KEY);
};

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({
        $or: [{ username }, { email: username }],
    });
    if (!user) throw Error("User not found");

    const correctPassword = await bcrypt.compare(password, user.hash);
    if (!correctPassword) throw Error("Incorrect Password!");

    const token = signUserToken(user);

    res.send({
        token,
        user,
    });
});

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const username = email.split("@")[0];
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({
        name,
        email,
        username,
        hash,
    });
    const token = signUserToken(user);

    res.send({
        token,
        user,
    });
});

module.exports = router;

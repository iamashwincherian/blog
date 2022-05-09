const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const AuthService = require("../services/auth.service");

const router = express.Router();

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const { token, user } = await AuthService.login(username, password);
    res.send({ token, user });
});

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const { token, user } = await AuthService.register(name, email, password);
    res.send({ token, user });
});

module.exports = router;

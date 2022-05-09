const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const generateToken = require("./_helpers/generateToken");

const login = async (username, password) => {
    const user = await User.findOne({
        $or: [{ username }, { email: username }],
    });
    if (!user) throw Error("User not found");

    const correctPassword = await bcrypt.compare(password, user.hash);
    if (!correctPassword) throw Error("Incorrect Password!");

    const token = generateToken(user);
    return { token, user };
};

const register = async (name, email, password) => {
    const username = email.split("@")[0];
    const hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));
    const user = await User.create({
        name,
        email,
        username,
        hash,
    });
    const token = generateToken(user);
    return { token, user };
};

module.exports = {
    login,
    register,
};

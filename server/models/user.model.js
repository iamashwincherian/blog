const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    hash: String,
});

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const connect = () => {
    mongoose.connect(process.env.DB_CONNECTION_URL, (res) => {
        console.log("Connected to db!")
    });
};

module.exports = connect;

const jwt = require("jsonwebtoken");

module.exports = ({ username, name }) => {
    return jwt.sign({ username, name }, process.env.JWT_PRIVATE_KEY);
};

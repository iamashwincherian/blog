const AuthService = require("../services/auth.service");

const login = async (req, res, next) => {
    const { username, password } = req.body;
    let token, user;
    
    try {
        const response = await AuthService.login(username, password);
        token = response.token;
        user = response.user;
    } catch (err) {
        return next(err);
    }
    
    res.send({ token, user });
}

const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    let token, user;
    
    try {
        const response = await AuthService.register(name, email, password);
        token = response.token;
        user = response.user;
    } catch (err) {
        return next(err);
    }
    
    res.send({ token, user });
}

module.exports = {
    login,
    register
};

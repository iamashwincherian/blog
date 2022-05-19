const router = require("express").Router();
const User = require("../models/user.model");

router.get("/", async (req, res) => {
    let users = await User.find({});

    res.send({
        users,
    });
});

module.exports = router;

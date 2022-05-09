const router = require("express").Router();
const authRoutes = require("./auth.route");

router.use("/auth", authRoutes);

router.get("/", (req, res) => {
    res.send({
        data: "Welcome to my Blog!",
    });
});

module.exports = router;

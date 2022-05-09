const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send({
        data: "Blog",
    });
});

app.listen(3000, () => console.log("server has started on port", PORT));

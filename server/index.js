const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./db/connect");
const routes = require("./routes");

const app = express();
dotenv.config();

const PORT = process.env.PORT;

const startServer = () => {
    connectDB();

    app.use(express.json());
    app.use("/api", routes);

    app.use((err, req, res, next) => {
        if (!err) next();
        res.status(500).send({ error: err.message });
    });

    app.listen(3000, () => console.log("Server has started on port:", PORT));
};

startServer();

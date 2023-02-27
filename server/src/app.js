const express = require("express");
const cors = require("cors");
const path = require("path");

const { corsOptions } = require("./config");

const planetsRouter = require("./routes/planets/planets.router");


const app = express();

// app.use(cors({
//     origin: "http://localhost:3000"
// }));

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "..", "public"))); // serving the frontend build as staic file (frontend production)
app.use(express.json());
app.use("/planets", planetsRouter);
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"))
});

module.exports = app;
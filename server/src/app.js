const express = require("express");
const cors = require("cors");

const { corsOptions } = require("./config");

const planetsRouter = require("./routes/planets/planets.router");


const app = express();

// app.use(cors({
//     origin: "http://localhost:3000"
// }));

app.use(cors(corsOptions));
app.use(express.json());
app.use("/planets", planetsRouter);

module.exports = app;
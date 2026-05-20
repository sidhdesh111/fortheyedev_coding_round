const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));


module.exports = app;


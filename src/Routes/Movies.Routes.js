const express = require("express");
const getMovieListController = require("../Controller/Movie.controller");


const MoviesRouter = express.Router();

MoviesRouter.get("/", getMovieListController);

module.exports = MoviesRouter;

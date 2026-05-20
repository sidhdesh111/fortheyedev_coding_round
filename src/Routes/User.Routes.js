const express = require("express");
const { RegisterController, loginController, logoutController } = require("../Controller/User.controller");

const UserRoutes = express.Router();

UserRoutes.post("/create", RegisterController);
UserRoutes.post("/login", loginController);
UserRoutes.get("/logout/:id", logoutController);

module.exports = UserRoutes;
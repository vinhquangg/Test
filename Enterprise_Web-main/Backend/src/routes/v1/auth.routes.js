const express = require("express");
const authController = require("../../controllers/auth.controller");
const { authenticate } = require("../../middlewares/authentication");
const authRouter = express.Router();

authRouter.post("/login", authController.login);
authRouter.get("/profile", authenticate, authController.profile);

module.exports = authRouter;

const express = require("express");
const userControllers = require("../../controllers/user.controller");
const userRouter = express.Router();

userRouter.get("/", userControllers.getUsers);
userRouter.get("/:id", userControllers.getUsersById);
userRouter.post("/", userControllers.createUser);
userRouter.put("/:id", userControllers.updateUser);
userRouter.delete("/:id", userControllers.deleteUser);

module.exports = userRouter;

const express = require("express");
const commentController = require("../../controllers/comment.controller");
const commentRouter = express.Router();

commentRouter.get("/", commentController.getComment);
commentRouter.post("/", commentController.createComment);

module.exports = commentRouter;

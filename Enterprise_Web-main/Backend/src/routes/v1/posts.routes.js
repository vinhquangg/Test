const express = require("express");
const postControllers = require("../../controllers/post.Controllers");
const postRouter = express.Router();

postRouter.get("/", postControllers.getPost);
postRouter.get("/:id", postControllers.getPostsById);
postRouter.post("/", postControllers.createPost);
postRouter.post("/update", postControllers.updatePost);
postRouter.delete("/:id", postControllers.deletePost);

module.exports = postRouter;

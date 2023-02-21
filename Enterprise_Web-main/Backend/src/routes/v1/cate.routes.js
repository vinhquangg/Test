const express = require("express");
const cateControllers = require("../../controllers/cate.Controllers");
const cateRouter = express.Router();

cateRouter.get("/", cateControllers.getCategory);
cateRouter.get("/:id", cateControllers.getCategoryById);
cateRouter.post("/", cateControllers.createCategory);
cateRouter.delete("/:id", cateControllers.deleteCategory);

module.exports = cateRouter;

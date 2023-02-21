const { Posts, Comments } = require("../models");

const getComment = async (req, res) => {
  try {
    const Cates = await Comments.findAll({
      include: [{ model: Posts, as: "post" }],
    });
    res.status(200).json(200, Cates);
  } catch (error) {
    console.log(error);
  }
};

const createComment = async (req, res) => {
  const { content, postId, userId } = req.body;
  try {
    const Cmt = await Comments.create({
      content,
      postId,
      userId,
    });
    res.status(201).json({ content: "Create Comment Successfully" });
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      res.status(400).json(400, err.errors);
    }
    console.log(err);
  }
};

module.exports = {
  getComment,
  createComment,
};

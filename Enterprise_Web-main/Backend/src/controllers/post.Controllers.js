const { Posts, Categorys, Comments } = require("../models");

const getPost = async (req, res) => {
  try {
    const posts = await Posts.findAll({
      include: [
        { model: Categorys, as: "category" },
        { model: Comments, as: "comment" },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
};

const getPostsById = async (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    res.status(400).json(400, "Invalid request");
  }

  try {
    const posts = await Posts.findByPk(id);
    if (posts) {
      res.status(200).json(200, posts);
    }
    res.status(200).json(400, "Posts not found");
  } catch (error) {
    console.log(error);
  }
};

const createPost = async (req, res) => {
  const { title, description, content, categoryId, commentId } = req.body;
  try {
    const posts = await Posts.create({
      title,
      description,
      content,
      categoryId,
      commentId,
    });
    res.status(200).json({ content: "Create Posts Successfully" });
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      res.status(400).json(400, err.errors);
    }
    console.log(err);
  }
};

const updatePost = async (req, res) => {
  try {
    const updatePost = req.body;
    const post = await Posts.findOneAndUpdate(
      { id: updatePost.id },
      updatePost,
      { new: true }
    );

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const deletePost = async (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    res.status(400).json(400, "Invalid request");
  }
  try {
    const posts = await Posts.findByPk(id);
    if (!posts) {
      res.status(400).json(400, "Posts not found");
    }
    await posts.destroy({ where: { id } });
    res.status(204).json(204, "Delete Posts Successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPost,
  getPostsById,
  createPost,
  updatePost,
  deletePost,
};

const { Users, Departments } = require("../models");

const getUsers = async (req, res) => {
  try {
    const user = await Users.findAll({
      attributes: { exclude: ["password"] },
      include: [{ model: Departments, as: "department" }],
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const getUsersById = async (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    res.status(400).json(400, "Invalid request");
  }

  try {
    const user = await Users.findByPk(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ content: "User not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  const { name, email, password, departmentId, role } = req.body;

  try {
    const user = await Users.create({
      name,
      email,
      password,
      departmentId,
      role,
    });
    res.status(201).json({ content: "Create User Successfully" });
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      res.status(400).json(400, err.errors);
    }
    console.log(err);
  }
};

const updateUser = async (req, res) => {
  const id = Number(req.params.id);
  const { name, email, departmentId, role } = req.body;

  if (!id) {
    res.status(400).json(400, "Invalid request");
  }

  const newUser = { name, email, departmentId, role };

  try {
    await Users.update(newUser, {
      where: {
        id,
      },
    });
    res.status(201).json({ content: "Update User Successfully" });
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      res.status(400).json(400, err.errors);
    }
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    res.status(400).json({ content: "Invalid request" });
  }
  try {
    const user = await Users.findByPk(id);
    if (!user) {
      res.status(400).json({ content: "User not found" });
    }
    await Users.destroy({ where: { id } });
    res.status(204).json({ content: "Delete User Successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
};

const { Users, Departments } = require("../models");

const getDepartments = async (req, res) => {
  try {
    const departments = await Departments.findAll({
      include: [{ model: Users, as: "user" }],
    });
    res.status(200).json(departments);
  } catch (error) {
    console.log(error);
  }
};

const getDepartmentsById = async (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    res.status(400).json(400, "Invalid request");
  }

  try {
    const department = await Departments.findByPk(id);
    if (department) {
      res.status(200).json(department);
    }
    res.status(200).json(400, "Department not found");
  } catch (error) {
    console.log(error);
  }
};

const createDepartment = async (req, res) => {
  const { name } = req.body;

  try {
    const department = await Departments.create({
      name,
    });
    res.status(201).json(201, "Create Department Successfully");
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      res.status(400).json(400, err.errors);
    }
    console.log(err);
  }
};

const deleteDepartment = async (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    res.status(400).json(400, "Invalid request");
  }
  try {
    const department = await Departments.findByPk(id);
    if (!department) {
      res.status(400).json(400, "Department not found");
    }
    await Departments.destroy({ where: { id } });
    res.status(204).json(204, "Delete Department Successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getDepartments,
  getDepartmentsById,
  createDepartment,
  deleteDepartment,
};

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Departments extends Model {
    static associate(db) {
      this.hasMany(db.Users, {
        as: "user",
        foreignKey: "departmentId",
      });
    }
  }

  Departments.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "name", //key to access the database
      },
    },
    {
      sequelize,
      modelName: "Departments", // model name,
      tableName: "department",
      timestamps: false,
    }
  );

  return Departments;
};

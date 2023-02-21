const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Categorys extends Model {
    static associate(db) {
      this.hasMany(db.Posts, {
        as: "post",
        foreignKey: "categoryId",
      });
    }
  }

  Categorys.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        field: "name", //key truy suất DB
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false, // Not Null
        field: "description",
      },
    },
    {
      sequelize,
      modelName: "Categorys", // Tên model,
      tableName: "category", //Tên table
      timestamps: false,
    }
  );
  return Categorys;
};

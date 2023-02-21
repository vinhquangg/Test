const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

module.exports = (sequelize) => {
  class Users extends Model {
    static associate(db) {
      this.belongsTo(db.Departments, {
        as: "department",
        foreignKey: "departmentId",
      });
      this.hasMany(db.Comments, {
        as: "comment",
        foreignKey: "userId",
      });
      this.hasMany(db.Posts, {
        as: "post",
        foreignKey: "userId",
      });
    }
  }

  Users.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "name", //key to access the database
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false, //don't allow null
        unique: true, // don't allow duplicated
        validate: {
          isEmail: {
            msg: "Email invalidate",
          },
        },
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        set(value) {
          if (!value) {
            value = nanoid();
          }

          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync(value, salt);
          this.setDataValue("password", hash);
        },
      },
      departmentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "departmentId",
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "Staff",
      },
    },
    {
      sequelize,
      modelName: "Users", // model name,
      tableName: "user",
      timestamps: false,
    }
  );

  return Users;
};

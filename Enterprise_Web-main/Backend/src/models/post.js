const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Posts extends Model {
    static associate(db) {
      this.belongsTo(db.Categorys, {
        as: "category",
        foreignKey: "categoryId",
      });
      this.hasMany(db.Comments, {
        as: "comment",
        foreignKey: "postId",
      });
      this.belongsTo(db.Users, {
        as: "user",
        foreignKey: "userId",
      });
    }
  }

  Posts.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "name", //key to access the database
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "description", //key to access the database
      },
      content: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "content", //key to access the database
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "userId", //key to access the database
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "categoryId", //key to access the database
      },
      view: {
        type: DataTypes.STRING,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Posts", // model name,
      tableName: "post",
      timestamps: false,
    }
  );

  return Posts;
};

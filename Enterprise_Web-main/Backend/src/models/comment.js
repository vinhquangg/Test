const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Comments extends Model {
    static associate(db) {
      this.belongsTo(db.Posts, {
        as: "post",
        foreignKey: "postId",
      });
      this.belongsTo(db.Users, {
        as: "user",
        foreignKey: "userId",
      });
    }
  }

  Comments.init(
    {
      content: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "content", //key to access the database
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "postId", //key to access the database
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "userId", //key to access the database
      },
    },
    {
      sequelize,
      modelName: "Comments", // model name,
      tableName: "comment",
      timestamps: false,
    }
  );

  return Comments;
};

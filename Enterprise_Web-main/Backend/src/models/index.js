const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(
  config.db_name,
  config.db_user,
  config.db_password,
  {
    dialect: config.db_dialect,
    host: config.db_host,
    port: config.db_port,
  }
);

const db = {};

// Khai báo thủ công các model
// db.Users = require("./user")(sequelize);
// db.Posts = require("./post")(sequelize);
// db.Categorys = require("./category")(sequelize);
// db.Comments = require("./comment")(sequelize);
// db.Departments = require("./department")(sequelize);

const basename = path.basename(__filename);
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file.slice(-3) === ".js" && file !== basename
    );
  })
  .forEach((file) => {
    const models = require(path.join(__dirname, file))(sequelize);
    db[models.name] = models;
  });

Object.keys(db).forEach((model) => {
  // Nếu bên trong model có định nghĩa các mối quan hệ
  if (db[model].associate) {
    db[model].associate(db);
  }
});

// Tự động sync dữ liệu giữa model và table trong db
sequelize.sync({ alter: true });

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;

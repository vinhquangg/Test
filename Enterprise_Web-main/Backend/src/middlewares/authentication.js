const jwt = require("jsonwebtoken");
const { User } = require("../models");

const extractTokenFromHeaderString = (token) => {
  if (!token) {
    return [null, "Token is missing"];
  }

  const parts = token.split(" ");
  if (parts.length < 2 || parts[0] != "Bearer" || parts[1] === "") {
    return [null, "Token Invalid"];
  }

  return [parts[1], null];
};

const authenticate = async (req, res, next) => {
  try {
    const [token, error] = extractTokenFromHeaderString(
      req.header("Authorization")
    );
    if (error) {
      res.status(401).json(error);
    }
    const payload = jwt.verify(token);

    // Check token còn hạn hay không
    // if (payload.exp < Date.now / 1000) {
    //   res.status(401).json(401, "Token is expired");
    // }

    const { id } = payload;
    const user = await User.findByPk(id);

    //Bước này để controller tiếp theo có thể nhận được thông tin user thông qua req
    req.user = user;

    console.log(payload);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json(401, "Token is expired");
    }
  }
};

const authorize =
  (...allowRoles) =>
  (req, res, next) => {
    const { role } = req.user;
    const isAllow = allowRoles.some((item) => item === role);

    if (!isAllow) {
      res.status(403).json(403, "Forbidden");
    }

    next();
  };

module.exports = {
  authenticate,
  authorize,
};

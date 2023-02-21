const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({
    where: { email },
  });

  if (!user) {
    res.status(400).json(400, "Email or password invalid");
  }
  // Password người dùng nhập vào là plaintext
  // Password lưu dưới db đã được hash
  const isMatched = bcrypt.compareSync(password, user.password);

  if (!isMatched) {
    res.status(400).json("Email or password invalid");
  }

  const token = generateToken(user);

  res.status(200).json({ user: user, token: token });
};

const profile = (req, res) => {
  // Thông tin này ấy từ middleware authenticate
  const user = req.user;
  res.status(200).json(user);
};

module.exports = {
  login,
  profile,
};

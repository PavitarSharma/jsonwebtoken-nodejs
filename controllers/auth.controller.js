const User = require("../models/User.model");
const createError = require("http-errors");

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw createError.BadRequest("Email or password must required!");

    const doesExit = await User.findOne({ email: email });
    if (doesExit) throw createError.Conflict("This email is alredy register!");

    const user = new User({ email, password });
    const saveUser = await user.save();

    res.json({
      message: "User registeration successfully done",
      saveUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  res.send("Login route");
};

exports.refreshToken = async (req, res, next) => {
  res.send("refresh token route");
};

exports.logout = async (req, res, next) => {
  res.send("Logout route");
};

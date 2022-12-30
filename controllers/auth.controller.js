const User = require("../models/User.model");
const createError = require("http-errors");
const { authSchema } = require("../helpers/auth.validation");

exports.register = async (req, res, next) => {
  try {
    // const { email, password } = req.body;

    // if (!email || !password) throw createError.BadRequest("Email or password must required!");

    const result = await authSchema.validateAsync(req.body);

    const doesExit = await User.findOne({ email: result.email });
    if (doesExit) throw createError.Conflict("This email is alredy register!");

    const user = new User(result);
    const saveUser = await user.save();

    res.json({
      message: "User registeration successfully done",
      saveUser,
    });
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
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

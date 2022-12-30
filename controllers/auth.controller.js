const User = require("../models/User.model");
const createError = require("http-errors");
const { authSchema } = require("../helpers/auth.validation");
const { signAccessToken } = require("../helpers/jwt_helper");

exports.register = async (req, res, next) => {
  try {
    // const { email, password } = req.body;

    // if (!email || !password) throw createError.BadRequest("Email or password must required!");

    const result = await authSchema.validateAsync(req.body);

    const doesExit = await User.findOne({ email: result.email });
    if (doesExit) throw createError.Conflict("This email is alredy register!");

    const user = new User(result);
    const saveUser = await user.save();
    const accessToken = await signAccessToken(saveUser._id);

    res.status(200).json({
      message: "User registeration successfully done",
      accessToken,
    });
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    const user = await User.findOne({ email: result.email });
    if (!user) throw createError.NotFound("User not found");

    const isMatchPassword = await user.isValidPassword(result.password);
    if (!isMatchPassword)
      throw createError.Unauthorized("Username/password not valid");

    const accessToken = await signAccessToken(user._id);
    
    res.status(200).json({
      message: "User looged in successfully",
      accessToken,
    });
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  res.send("refresh token route");
};

exports.logout = async (req, res, next) => {
  res.send("Logout route");
};

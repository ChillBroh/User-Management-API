const User = require("../models/usersModal");
const authController = require("./authController");
const passwordHash = require("../utils/passwordHash");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

//route     POST /api/v1/user/register
const registerUser = catchAsync(async (req, res, next) => {
  const { image, userName, email, mobileNo, password } = req.body;

  const userExistUserName = await User.findOne({ userName });

  if (userExistUserName) {
    return next(new AppError("Username Already Exists!", 400));
  }
  const userExistEmail = await User.findOne({ email });

  if (userExistEmail) {
    return next(new AppError("Email Already Exists!", 400));
  }
  let hashedPassword;
  try {
    hashedPassword = await passwordHash(password);
    console.log(hashedPassword);
  } catch (error) {
    return next(AppError("Error hashing password", 400));
  }

  const user = await User.create({
    userName,
    email,
    image,
    password: hashedPassword,
    mobileNo,
    createdDate: new Date(),
  });

  if (user) {
    return res.status(201).json({
      status: "success",
      message: "User Registered Successfully",
    });
  } else {
    return next(new AppError("Token Generation Failed!", 400));
  }
});

module.exports = { registerUser };

// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import UserEcommerce from "../Models/userModel.js";
import dotenv from "dotenv";
import { createError } from "../Error/error.js";

dotenv.config();

// SIGNUP
export const register = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const existingUser = await UserEcommerce.findOne({ email });
    console.log(existingUser);

    if (existingUser) return next(createError(404, "User alraedy exist."));

    const hashedPassword = CryptoJS.AES.encrypt(
      req.body.password,
      "secret"
    ).toString();
    console.log(hashedPassword);
    const result = await UserEcommerce.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const token = jwt.sign(
      { id: result._id, email: result.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1y",
      }
    );

    res.status(200).json({
      email: result.email,
      firstName: result.firstName,
      lastName: result.lastName,
      id: result._id,
      token,
    });
  } catch (error) {
    next(createError(404, "Something went wrong"));
  }
};

// LOGIN
export const login = async (req, res, next) => {
  try {
    const existingUser = await UserEcommerce.findOne({ email: req.body.email });

    !existingUser && next(createError(404, "User doesn't exist."));

    const hashedPassword = CryptoJS.AES.decrypt(
      existingUser.password,
      "secret"
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    originalPassword !== req.body.password &&
      next(createError(400, "Invalid Email or Password."));

    const token = jwt.sign(
      { isAdmin: existingUser.isAdmin, id: existingUser._id },
      process.env.JWT_SECRET,

      { expiresIn: "1y" }
    );
    const { password, firstName, lastName, email, _id, isAdmin } =
      existingUser._doc;

    res
      .status(200)
      .json({ firstName, lastName, email, id: _id, isAdmin, token });
  } catch (err) {
    next(createError(404, "Something went wrong"));
  }
};

// =====GETUSERS
export const getUsers = async (req, res, next) => {
  const query = req.query.new;

  try {
    const users = query
      ? await UserEcommerce.find().sort({ _id: -1 }).limit(1)
      : await UserEcommerce.find();
    res.status(200).json(users);
  } catch (err) {
    next(createError(404, "Something went wrong"));
  }
};

// =====STATS
export const userStats = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await UserEcommerce.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    next(createError(404, "Something went wrong"));
  }
};

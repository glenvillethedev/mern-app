import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

// generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "1H" });
};

// login
export const loginUser = async (req, res, next) => {
  try {
    // receive values
    const { email, password } = req.body;
    const emptyFields = [];

    // validate values
    if (!email) {
      emptyFields.push("email");
    }
    if (!password) {
      emptyFields.push("password");
    }
    if (emptyFields.length != 0) {
      const err = new Error("Please fill in the missing fields.");
      err.status = 400;
      err.emptyFields = emptyFields;
      err.isValidation = true;
      throw err;
    }

    // validate email
    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error("Incorrect Email.");
      err.status = 400;
      throw err;
    }

    // validate password
    if (!(await bcrypt.compare(password, user.password))) {
      const err = new Error("Incorrect Password.");
      err.status = 400;
      throw err;
    }

    // return user
    const token = generateToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    next(error);
  }
};

// signup
export const signupUser = async (req, res, next) => {
  try {
    // receive values
    const { email, password } = req.body;
    const emptyFields = [];

    // validate values
    if (!email) {
      emptyFields.push("email");
    }
    if (!password) {
      emptyFields.push("password");
    }
    if (emptyFields.length != 0) {
      const err = new Error("Please fill in the missing fields.");
      err.status = 400;
      err.emptyFields = emptyFields;
      err.isValidation = true;
      throw err;
    }
    if (!validator.isEmail(email)) {
      const err = new Error("Email is not valid.");
      err.status = 400;
      throw err;
    }
    if (!validator.isStrongPassword(password)) {
      const err = new Error("Password not strong enough.");
      err.status = 400;
      throw err;
    }
    if (await User.findOne({ email })) {
      const err = new Error("Email already exists.");
      err.status = 400;
      throw err;
    }

    // generate salt, hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const newUser = await User.create({ email, password: hashedPassword });

    // return user
    const token = generateToken(newUser._id);
    res.status(200).json({ email, token });
  } catch (error) {
    next(error);
  }
};

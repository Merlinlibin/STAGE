const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password)
      return res.status(400).send({ message: "please Enter all fields" });

    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(400).send({ message: "user already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });
    if (user) {
      return res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: token,
        message: "User Created Successfully",
      });
    } else {
      return res.status(400).send({ message: "Failed to create user" });
    }
  } catch (error) {
    console.log(`Error in SignUp : ${error}`);
    return res.status(500).send({ message: `Server Error : ${error} ` });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const isAuthenticated = await bcrypt.compare(password, user.password);

      if (!isAuthenticated) {
        return res.status(401).json({
          message: "password is incorrect",
        });
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "12h",
      });
      return res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: token,
        message: "logged in sucessfully",
      });
    } else {
      return res.status(400).send({
        message: "User dosent exist, Please signup and continue",
      });
    }
  } catch (error) {
    console.log(`Error in SignUp : ${error}`);
    return res.status(500).send({
      message: `Server Error : ${error} `,
    });
  }
};

module.exports = {
  signup,
  login,
};

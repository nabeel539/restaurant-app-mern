import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import "dotenv/config.js";

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User Doesn't exist",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = createToken(user._id);
    res.json({ success: true, token, message: "Login Successful" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// token creation
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET); // , { expiresIn: "1d" }
};
// register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    //checking user already exists.
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User aleady exists" });
    }
    //validating email format and Strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating user
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token, message: "Register Successful" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
};

export { loginUser, registerUser };

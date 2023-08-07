import bcrypt from "bcrypt";
import User from "../models/user.js";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  const { username, email, password, full_name, age, gender } = req.body;

  try {
    if (!username || !email || !password || !full_name || !age || !gender) {
      throw {
        code: "INVALID_REQUEST",
        message:
          "Invalid request. Please provide all required fields: username, email, password, full_name, age, gender.",
      };
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      throw {
        code: "INVALID_PASSWORD",
        message:
          "The provided password does not meet the requirements. Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters.",
      };
    }
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      const errorField =
        existingUser.username === username ? "username" : "email";
      const errorMessage = `The provided ${errorField} is already taken. Please choose a different ${errorField}.`;
      const errorCode =
        errorField === "username" ? "USERNAME_EXISTS" : "EMAIL_EXISTS";
      throw { code: errorCode, message: errorMessage };
    }
    if (!Number.isInteger(age) || age <= 0) {
      throw {
        code: "INVALID_AGE",
        message: "Invalid age value. Age must be a positive integer.",
      };
    }
    if (!gender.trim()) {
      throw {
        code: "GENDER_REQUIRED",
        message:
          "Gender field is required. Please specify the gender (e.g., male, female, non-binary).",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      full_name,
      age,
      gender,
    });

    res.json({
      status: "success",
      message: "User successfully registered!",
      data: {
        user_id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        age: user.age,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    const defaultErrorMessage =
      "An internal server error occurred. Please try again later.";
    const responseCode = error.code || "INTERNAL_SERVER_ERROR";
    const responseMessage = error.message || defaultErrorMessage;
    res.status(500).json({
      status: "error",
      code: responseCode,
      message: responseMessage,
    });
  }
};
const generateToken = (user) => {
    return jwt.sign({ userId: user.id }, "dpdZero", { expiresIn: "1h" });
  };
export const login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({
          status: "error",
          code: "USER_NOT_FOUND",
          message: "User not found. Please check your username and password.",
        });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({
          status: "error",
          code: "INVALID_PASSWORD",
          message: "Invalid password. Please check your username and password.",
        });
      }
      const token = generateToken(user);
  
      res.json({
        status: "success",
        message: "Access token generated successfully.",
        data: {
          access_token: token,
          expires_in: 3600,
        },
      });
    } catch (error) {
      console.error("Error generating access token:", error);
      res.status(500).json({
        status: "error",
        code: "SERVER_ERROR",
        message: "Internal server error. Please try again later.",
      });
    }
  };
  
  
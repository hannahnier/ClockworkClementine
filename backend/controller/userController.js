import bcrypt from "bcrypt";

import { User } from "../models/userModel.js";
import { jwtSign } from "../utils/jwt.js";

/////////////////////// Get a user: ///////////////////////

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("calendars");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

/////////////////////// Create a new user: ///////////////////////

export const postUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        error: "Information (username, email or password) missing in request",
      });
    }

    // Hash password:
    const hashed = await bcrypt.hash(password, 10);
    if (!hashed) {
      return res.status(500).json({ error: "Hashing not successful" });
    }

    // Create new user:
    const newUser = {
      username,
      email,
      password: hashed,
      calendars: [],
    };
    const created = await User.create(newUser);
    if (!created) {
      return res
        .status(500)
        .json({ error: "User could not be created in database" });
    }

    // Set id in request body for next middleware:
    req.body.id = created._id;
    next();
  } catch (err) {
    next(err);
  }
};

/////////////////////// Check password: ///////////////////////

export const checkPassword = async (req, res, next) => {
  console.log("checkPassword");
  try {
    const { email, password } = req.body;
    console.log("email", email);
    console.log("password", password);
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Missing information (email or password)." });
    }

    // Find user by email, hash password and compare it:
    const orgUser = await User.findOne({ email: email });
    console.log("orgUser", orgUser);
    const orgHashed = orgUser.password;
    console.log("orgHashed", orgHashed);
    const match = await bcrypt.compare(password, orgHashed);
    console.log("match", match);
    if (!match) {
      return res
        .status(400)
        .json({ error: "Login failed. Wrong email or password." });
    }
    next();
  } catch (err) {
    next(err);
  }
};

/////////////////////// Set a cookie: ///////////////////////

export const setCookie = async (req, res, next) => {
  console.log("setCookie");
  try {
    const { email } = req.body;
    console.log("email", email);

    // Find user by email:
    const user = await User.findOne({ email: email });
    console.log("user", user);
    if (!user) {
      return res
        .status(404)
        .json({ error: "No user with this email address found." });
    }

    // Create access token:
    const token = await jwtSign(email, user._id, user.username);
    console.log("token", token);
    if (!token) {
      return res
        .status(500)
        .json({ error: "Access token could not be created." });
    }

    // Set cookie:
    res.cookie("accessToken", token, {
      maxAge: 1000 * 60 * 240,
      path: "/",
      httpOnly: true,
    });
    console.log("cookie set");
    return res
      .status(200)
      .json({ id: user._id, username: user.username, email: user.email });
  } catch (err) {
    next(err);
  }
};

/////////////////////// Remove a cookie: ///////////////////////

export const removeCookie = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json({ user: null });
  } catch (err) {
    next(err);
  }
};

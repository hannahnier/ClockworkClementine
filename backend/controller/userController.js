import bcrypt from "bcrypt";

import { User } from "../models/userModel.js";
import { jwtSign } from "../utils/jwt.js";

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("calendars");
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const postUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        error: "Information (username, email or password) missing in request",
      });
    }
    const hashed = await bcrypt.hash(password, 10);
    if (!hashed) {
      return res.status(500).json({ error: "Hashing not successful" });
    }
    const newUser = {
      username,
      email,
      password: hashed,
    };
    const created = await User.create(newUser);
    if (!created) {
      return res
        .status(500)
        .json({ error: "User could not be created in database" });
    }
    req.body.id = created._id;
    next();
  } catch (err) {
    next(err);
  }
};

export const setCookie = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ error: "No user with this email address found." });
    }
    const token = await jwtSign(email, user._id, user.username);
    if (!token) {
      return res
        .status(500)
        .json({ error: "Access token could not be created." });
    }
    res.cookie("accessToken", token, {
      maxAge: 1000 * 60 * 5,
      path: "/",
      httpOnly: true,
    });
    // hier bei rememberMe: true die Zeit auf 30 Tage setzen
    return res
      .status(200)
      .json({ id: user._id, username: user.username, email: user.email });
  } catch (err) {
    next(err);
  }
};

export const removeCookie = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json({ user: null });
  } catch (err) {
    next(err);
  }
};

export const checkPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Missing information (email or password)." });
    }
    const orgUser = await User.findOne({ email: email });
    const orgHashed = orgUser.password;
    const match = await bcrypt.compare(password, orgHashed);
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

// rememberMe noch einbauen in controllers

// export const getAllUsers = async (req, res, next) => {
//   try {
//     const users = await User.find({});
//     res.status(200).json(users);
//   } catch (err) {
//     next(err);
//   }
// };

// export const updateUser = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const oldUser = await User.findById(id);
//     if (!oldUser) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     const username = req.body.username || oldUser.username;
//     const email = req.body.email || oldUser.email;
//     const password =
//       (await bcrypt.hash(req.body.password, 10)) || oldUser.password;
//     const newUser = { username, email, password };
//     const options = { new: true, runValidators: true };
//     const updated = await User.findByIdAndUpdate(id, newUser, options);
//     if (!updated) {
//       return res.status(500).json({ error: "updating user failed" });
//     }
//     res.status(200).json(updated);
//   } catch (err) {
//     next(err);
//   }
// };

// export const deleteUser = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const deleted = await User.findByIdAndDelete(id);
//     if (!deleted) {
//       return res
//         .status(404)
//         .json({ error: "User not found or could not be deleted." });
//     }
//     res.status(200).json({ deleted: deleted });
//   } catch (err) {
//     next(err);
//   }
// };

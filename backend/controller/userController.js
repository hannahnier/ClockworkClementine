import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
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
        error: "information (username, email or password) missing in request",
      });
    }
    const hashed = await bcrypt.hash(password, 10);
    if (!hashed) {
      return res.status(500).json({ error: "hashing not successful" });
    }
    const newUser = { username, email, password: hashed };
    const created = await User.create(newUser);
    if (!created) {
      return res
        .status(500)
        .json({ error: "User could not be created in database" });
    }
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldUser = await User.findById(id);
    if (!oldUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const username = req.body.username || oldUser.username;
    const email = req.body.email || oldUser.email;
    const password =
      (await bcrypt.hash(req.body.password, 10)) || oldUser.password;
    const newUser = { username, email, password };
    const options = { new: true, runValidators: true };
    const updated = await User.findByIdAndUpdate(id, newUser, options);
    if (!updated) {
      return res.status(500).json({ error: "updating user failed" });
    }
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ error: "User not found or could not be deleted" });
    }
    res.status(200).json({ deleted: deleted });
  } catch (err) {
    next(err);
  }
};

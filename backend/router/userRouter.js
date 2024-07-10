import express from "express";

import {
  getAllUsers,
  getUser,
  postUser,
  updateUser,
  deleteUser,
  loginCheckPassword,
  loginCreateToken,
} from "../controller/userController.js";

export const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(postUser);
userRouter.route("/login").post(loginCheckPassword, loginCreateToken);
userRouter.route("/register").post(loginCreateToken);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

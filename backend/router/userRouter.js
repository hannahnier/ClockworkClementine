import express from "express";

import {
  getAllUsers,
  getUser,
  postUser,
  updateUser,
  deleteUser,
} from "../controller/userController.js";

export const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(postUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

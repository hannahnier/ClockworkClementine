import express from "express";

import {
  // getAllUsers,
  getUser,
  postUser,
  // updateUser,
  // deleteUser,
  checkPassword,
  setCookie,
  removeCookie,
} from "../controller/userController.js";

export const userRouter = express.Router();

// userRouter.route("/").get(getAllUsers);
userRouter.route("/register").post(postUser, setCookie);
userRouter.route("/login").post(checkPassword, setCookie);
userRouter.route("/logout").post(removeCookie);
userRouter.route("/:id").get(getUser);
// .patch(updateUser).delete(deleteUser);

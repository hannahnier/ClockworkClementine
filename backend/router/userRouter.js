import express from "express";

import {
  getUser,
  postUser,
  checkPassword,
  setCookie,
  removeCookie,
  ping
} from "../controller/userController.js";

export const userRouter = express.Router();

userRouter.route("/register").post(postUser, setCookie);
userRouter.route("/login").post(checkPassword, setCookie);
userRouter.route("/logout").post(removeCookie);
userRouter.route("/").get(ping);
userRouter.route("/:id").get(getUser);

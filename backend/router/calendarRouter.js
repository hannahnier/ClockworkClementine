import express from "express";

import {
  postCalendar,
  getUserCalendars,
  authenticateUser,
} from "../controller/calendarController.js";

export const calendarRouter = express.Router();

calendarRouter
  .route("/")
  .get(authenticateUser, getUserCalendars)
  .post(postCalendar);

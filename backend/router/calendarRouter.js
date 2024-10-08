import express from "express";

import {
  postCalendar,
  getUserCalendars,
  authenticateUser,
  deleteCalendar,
  updateCalendar,
} from "../controller/calendarController.js";

export const calendarRouter = express.Router();

calendarRouter
  .route("/")
  .get(authenticateUser, getUserCalendars)
  .post(authenticateUser, postCalendar);

calendarRouter
  .route("/:id")
  .delete(authenticateUser, deleteCalendar)
  .patch(authenticateUser, updateCalendar);

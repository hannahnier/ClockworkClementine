import express from "express";

import {
  getAllCalendars,
  getCalendar,
  postCalendar,
  updateCalendar,
  deleteCalendar,
} from "../controller/calendarController.js";

export const calendarRouter = express.Router();

calendarRouter.route("/").get(getAllCalendars).post(postCalendar);
calendarRouter
  .route("/:id")
  .get(getCalendar)
  .patch(updateCalendar)
  .delete(deleteCalendar);

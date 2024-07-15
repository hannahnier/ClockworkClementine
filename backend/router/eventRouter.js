import express from "express";
import {
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controller/eventController.js";
import { authenticateUser } from "../controller/calendarController.js";

export const eventRouter = express.Router();

eventRouter.post(
  "/calendars/:calendarId/events",
  authenticateUser,
  createEvent
);

eventRouter.patch(
  "/calendars/:calendarId/events/:eventId",
  authenticateUser,
  updateEvent
);

eventRouter.delete(
  "/calendars/:calendarId/events/:eventId",
  authenticateUser,
  deleteEvent
);

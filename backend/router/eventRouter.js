import express from "express";
import { postEvent } from "../controller/eventController.js";
import { authenticateUser } from "../controller/calendarController.js";

export const eventRouter = express.Router();

eventRouter.post("/calendars/:calendarId/events", authenticateUser, postEvent);

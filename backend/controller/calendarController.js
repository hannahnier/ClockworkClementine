import { Calendar } from "../models/calendarModel.js";
import { Event } from "../models/eventModel.js";
import { jwtVerify } from "../utils/jwt.js";

export const postCalendar = async (req, res, next) => {
  try {
    const { title, events, user } = req.body;
    if (!title || !events) {
      return res
        .status(400)
        .json({ error: "Please specify a title and events for the calendar" });
    }
    const newCalendar = { title, events, user };
    const created = await Calendar.create(newCalendar);
    if (!created) {
      return res
        .status(500)
        .json({ error: "Calendar could not be created in database" });
    }
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies["accessToken"];
    if (!token) {
      return res.status(400).json({
        error: "Cookie is missing or has expanded. Please log in first.",
      });
    }
    const verification = await jwtVerify(token);
    if (!verification) {
      return res
        .status(400)
        .json({ error: "Cookie could not be verified. Please log in first." });
    }
    req.user = verification;
    next();
  } catch (err) {
    next(err);
  }
};

export const getUserCalendars = async (req, res, next) => {
  try {
    const { id } = req.user;
    const calendars = await Calendar.find({ user: id }).populate("events");
    res.status(200).json({ calendars: calendars, user: req.user });
  } catch (err) {
    next(err);
  }
};

// export const deleteCalendar = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Calendar.findByIdAndDelete(id);
//     if (!deleted) {
//       res
//         .status(404)
//         .json({ error: "Calendar not found or could not be deleted" });
//     }
//     res.status(200).json({ deleted: deleted });
//   } catch (err) {
//     next(err);
//   }
// };

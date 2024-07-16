import { Calendar } from "../models/calendarModel.js";
import { User } from "../models/userModel.js";
import { Event } from "../models/eventModel.js";
import { jwtVerify } from "../utils/jwt.js";

export const postCalendar = async (req, res, next) => {
  try {
    const { title, events, user } = req.body;
    if (!user) {
      return res
        .status(400)
        .json({ error: "Calendar could not be assigned to a user" });
    }
    const newCalendar = { title: title || "", events: events || [], user };
    const created = await Calendar.create(newCalendar);

    if (!created) {
      return res
        .status(500)
        .json({ error: "Calendar could not be created in database" });
    }

    const associatedUser = await User.findById(user);

    if (!associatedUser) {
      return res
        .status(404)
        .json({ error: "User not found or could not be associated" });
    }

    const updatedCalendars = associatedUser.calendars.concat(created._id);

    const updatedUser = await User.findByIdAndUpdate(
      user,
      { calendars: updatedCalendars },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(500)
        .json({ error: "Calendar could not be added to user profile" });
    }

    const populatedUser = await User.findById(user).populate("calendars");

    res.status(201).json(populatedUser);
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

export const deleteCalendar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCalendar = await Calendar.findByIdAndDelete(id);
    if (!deletedCalendar) {
      res
        .status(404)
        .json({ error: "Calendar not found or could not be deleted" });
    }

    const user = await User.findOne({ calendars: id });

    if (!user) {
      return res.status(404).json({
        error:
          "User not found (calendar could not be deleted from user's profile)",
      });
    }

    const updatedCalendars = User.calendars.filter(
      (calendar) => calendar.toString() !== id.toString()
    );

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { calendars: updatedCalendars },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(500)
        .json({ error: "Calendar could not be removed from user" });
    }

    const populatedUser = await User.findById(user._id).populate("calendars");

    res.status(201).json(populatedUser);
  } catch (err) {
    next(err);
  }
};

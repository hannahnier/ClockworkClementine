import { Calendar } from "../models/calendarModel.js";
import { User } from "../models/userModel.js";
import { Event } from "../models/eventModel.js";
import { jwtVerify } from "../utils/jwt.js";

/////////////////////// Check & verify accessToken ///////////////////////

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

/////////////////////// Get all calendars of the user: ///////////////////////

export const getUserCalendars = async (req, res, next) => {
  try {
    const { id } = req.user;
    const calendars = await Calendar.find({ user: id }).populate("events");
    res.status(200).json({ calendars: calendars, user: req.user });
  } catch (err) {
    next(err);
  }
};

/////////////////////// Create a new calendar: ///////////////////////

export const postCalendar = async (req, res, next) => {
  try {
    const { title, events, user } = req.body;
    if (!user) {
      return res
        .status(400)
        .json({ error: "Calendar could not be assigned to a user" });
    }

    // Find the user:
    const associatedUser = await User.findById(user).populate("calendars");
    if (!associatedUser) {
      return res
        .status(404)
        .json({ error: "User not found or could not be associated" });
    }

    // Assign a color (if it is already in use, pick a random hexadecimal color):
    const bestColors = [
      "#9babf7",
      "#f89090",
      "#fca3f7",
      "#05c79d",
      "#fc4949",
      "#73e76f",
      "#fcc65a",
      "#bd8efa",
      "#81e6c4",
      "#ec49bb",
      "#6968cf",
      "#ff7f3e",
      "#278eee",
      "#07866b",
    ];

    // Find a color that is not already in use
    // (preferably from the bestColors array, but after 30 attempts choose randomly):
    const usedColors = associatedUser.calendars.map(
      (calendar) => calendar.color
    );
    let color = bestColors[Math.floor(Math.random() * bestColors.length)];
    let i = 30;
    while (usedColors.includes(color) && i > 0) {
      color = bestColors[Math.floor(Math.random() * bestColors.length)];
      i--;
    }
    if (usedColors.includes(color)) {
      color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    // Create the calendar:
    const newCalendar = {
      title: title || "",
      events: events || [],
      user,
      color: color || "#000000",
    };
    const created = await Calendar.create(newCalendar);
    if (!created) {
      return res
        .status(500)
        .json({ error: "Calendar could not be created in database" });
    }

    // Update user profile:
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

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

/////////////////////// Update a calendar: ///////////////////////

export const updateCalendar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const updatedCalendar = await Calendar.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );
    if (!updatedCalendar) {
      res
        .status(404)
        .json({ error: "Calendar not found or could not be updated" });
    }
    res.status(201).json(updatedCalendar);
  } catch (err) {
    next(err);
  }
};

/////////////////////// Delete a calendar: ///////////////////////

export const deleteCalendar = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Delete calendar:
    const deletedCalendar = await Calendar.findByIdAndDelete(id);
    if (!deletedCalendar) {
      res
        .status(404)
        .json({ error: "Calendar not found or could not be deleted" });
    }

    // Delete events:
    const deletedEvents = await Event.deleteMany({ calendar: id });
    if (!deletedEvents) {
      return res
        .status(404)
        .json({ error: "Events not found or could not be deleted" });
    }

    // Update user:
    const user = await User.findOne({ calendars: id });
    if (!user) {
      return res.status(404).json({
        error:
          "User not found (calendar could not be deleted from user's profile)",
      });
    }
    const updatedCalendars = user.calendars.filter(
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

    // Return updated user with info on calendars:
    const populatedUser = await User.findById(user._id).populate("calendars");

    res.status(201).json(populatedUser);
  } catch (err) {
    next(err);
  }
};

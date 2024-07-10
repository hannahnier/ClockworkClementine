import { Calendar } from "../models/calendarModel.js";

export const getAllCalendars = async (req, res, next) => {
  try {
    const calendars = await Calendar.find({});
    res.status(200).json(calendars);
  } catch (err) {
    next(err);
  }
};

export const getCalendar = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const calendar = await Calendar.findById(id);
    if (!calendar) {
      return res.status(404).json({ error: "Calendar not found" });
    }
    res.status(200).json(calendar);
  } catch (err) {
    next(err);
  }
};

export const postCalendar = async (req, res, next) => {
  try {
    const { title, events } = req.body; // hier noch den dazugehörigen User als Info mitgeben?
    if (!title || !events) {
      return res
        .status(400)
        .json({ error: "Please specify a title and events for the calendar" });
    }
    const newCalendar = { title, events };
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

export const updateCalendar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldCalendar = await Calendar.findById(id);
    if (!oldCalendar) {
      return res.status(404).json({ error: "Calendar not found" });
    }
    const title = req.body.title || oldCalendar.title;
    const events = req.body.events || oldCalendar.events;
    const newCalendar = { title, events };
    const options = { new: true, runValidators: true };
    const updated = await Calendar.findByIdAndUpdate(id, newCalendar, options);
    if (!updated) {
      return res.status(500).json({ error: "Updating calendar failed" });
    }
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteCalendar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Calendar.findByIdAndDelete(id);
    if (!deleted) {
      res
        .status(404)
        .json({ error: "Calendar not found or could not be deleted" });
    }
    res.status(200).json({ deleted: deleted });
  } catch (err) {
    next(err);
  }
};

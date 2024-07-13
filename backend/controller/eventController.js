import { Event } from "../models/eventModel.js";
import { Calendar } from "../models/calendarModel.js";

export const postEvent = async (req, res, next) => {
  try {
    let { calendarId } = req.params;
    let { start, end, title } = req.body;
    if (!title || !start || !end) {
      return res.status(400).json({
        error:
          "Please specify a title and start/ending dates for the new event",
      });
    }
    start = "2024-07-20T18:00:00.000Z";
    end = "2024-07-20T20:00:00.000Z";
    // new Date(2024, 6, 20, 18, 0, 0).toString()
    const newEvent = { start, end, title, calendar: calendarId };
    const created = await Event.create(newEvent);
    if (!created) {
      return res
        .status(500)
        .json({ error: "Event could not be created in database" });
    }

    const calendar = await Calendar.findById(calendarId);
    console.log("calendar", calendar);
    if (!calendar) {
      return res.status(404).json({ error: "Calendar not found" });
    }

    console.log("created ID", created._id);

    calendar.events.push(created._id);
    await calendar.save();

    const populatedCalendar = await Calendar.findById(calendarId).populate(
      "events"
    );

    if (!populatedCalendar) {
      return res
        .status(500)
        .json({ error: "Event could not be added to calendar" });
    }

    res.status(201).json({ created });
  } catch (err) {
    next(err);
  }
};

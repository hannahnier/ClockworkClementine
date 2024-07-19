import { Event } from "../models/eventModel.js";
import { Calendar } from "../models/calendarModel.js";

/////////////////////// Create a new event: ///////////////////////

export const createEvent = async (req, res, next) => {
  try {
    let { calendarId } = req.params;
    let { start, end, title } = req.body;
    if (!title || !start || !end) {
      return res.status(400).json({
        error:
          "Please specify a title and start/ending dates for the new event",
      });
    }

    // Create new event:
    const newEvent = { start, end, title, calendar: calendarId };
    const created = await Event.create(newEvent);
    if (!created) {
      return res
        .status(500)
        .json({ error: "Event could not be created in database" });
    }

    // Update calendar:
    const calendar = await Calendar.findById(calendarId);
    if (!calendar) {
      return res.status(404).json({ error: "Calendar not found" });
    }
    const updatedEvents = calendar.events.concat(created._id);
    const updatedCalendar = await Calendar.findByIdAndUpdate(
      calendarId,
      { events: updatedEvents },
      { new: true }
    );
    if (!updatedCalendar) {
      return res
        .status(500)
        .json({ error: "Event could not be added to calendar" });
    }

    // Return updated calendar with populated events:
    const populatedCalendar = await Calendar.findById(calendarId).populate(
      "events"
    );
    res.status(201).json(populatedCalendar);
  } catch (err) {
    next(err);
  }
};

/////////////////////// Update an event: ///////////////////////

export const updateEvent = async (req, res, next) => {
  try {
    let { eventId } = req.params;
    let { start, end, title, calendarId } = req.body;
    if (!title || !start || !end) {
      return res.status(400).json({
        error:
          "Please specify a title and start/ending dates for the new event",
      });
    }

    // Update event:
    const update = { start, end, title, calendar: calendarId };
    const updatedEvent = await Event.findByIdAndUpdate(eventId, update, {
      new: true,
    });
    if (!updatedEvent) {
      return res
        .status(500)
        .json({ error: "Event could not be updated in database" });
    }

    // Update calendar by populating events:
    const calendar = await Calendar.findById(calendarId);
    if (!calendar) {
      return res.status(404).json({ error: "Calendar not found" });
    }
    const populatedCalendar = await Calendar.findById(calendarId).populate(
      "events"
    );
    res.status(201).json(populatedCalendar);
  } catch (err) {
    next(err);
  }
};

/////////////////////// Delete an event: ///////////////////////
export const deleteEvent = async (req, res, next) => {
  try {
    let { eventId } = req.params;
    if (!eventId) {
      return res
        .status(400)
        .json({ error: "Please specify an event to delete" });
    }

    // Delete event:
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res
        .status(500)
        .json({ error: "Event could not be deleted due to a server error" });
    }

    // Remove event from calendar:
    const calendar = await Calendar.findOne({ events: eventId });
    if (!calendar) {
      return res.status(404).json({
        error: "Calendar not found (event could not be deleted)",
      });
    }
    const updatedEvents = calendar.events.filter(
      (event) => event.toString() !== eventId.toString()
    );
    const updatedCalendar = await Calendar.findByIdAndUpdate(
      calendar._id,
      { events: updatedEvents },
      { new: true }
    );
    if (!updatedCalendar) {
      return res
        .status(500)
        .json({ error: "Event could not be removed from calendar" });
    }

    // Return updated calendar with populated events:
    const populatedCalendar = await Calendar.findById(calendar._id).populate(
      "events"
    );
    res.status(201).json(populatedCalendar);
  } catch (err) {
    next(err);
  }
};

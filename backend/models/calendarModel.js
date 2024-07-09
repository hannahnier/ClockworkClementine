import mongoose, { version } from "mongoose";

const { Schema, model } = mongoose;

const eventSchema = new Schema({
  title: String, // required machen?
  date: String,
});

const calendarSchema = new Schema(
  {
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    events: { type: [eventSchema] },
  },
  { versionKey: false }
);

export const Calendar = model("Calendar", calendarSchema);

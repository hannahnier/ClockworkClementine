import mongoose, { version } from "mongoose";
import validator from "validator";

const { Schema, model } = mongoose;

const eventSchema = new Schema({
  title: {
    type: String,
    set: function (input) {
      return validator.escape(input);
    },
  }, // required machen?
  date: {
    type: String,
    set: function (input) {
      return validator.escape(input);
    },
  },
});

const calendarSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      set: function (input) {
        return validator.escape(input);
      },
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    events: { type: [eventSchema] },
  },
  { versionKey: false }
);

export const Calendar = model("Calendar", calendarSchema);

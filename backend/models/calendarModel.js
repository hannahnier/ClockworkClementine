import mongoose, { version } from "mongoose";
import validator from "validator";

const { Schema, model } = mongoose;

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
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  },
  { versionKey: false }
);

export const Calendar = model("Calendar", calendarSchema);

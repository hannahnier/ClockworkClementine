import mongoose from "mongoose";
import validator from "validator";

const { Schema, model } = mongoose;

const eventSchema = new Schema(
  {
    start: {
      type: Date,
      // required machen?
    },
    end: {
      type: Date,
      // required machen?
    },
    title: {
      type: String,
      set: function (input) {
        return validator.escape(input);
      },
    }, // required machen?
    calendar: { type: mongoose.Schema.Types.ObjectId, ref: "Calendar" },
  },
  { versionKey: false }
);

export const Event = model("Event", eventSchema);

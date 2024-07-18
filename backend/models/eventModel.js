import mongoose from "mongoose";
import validator from "validator";

const { Schema, model } = mongoose;

const eventSchema = new Schema(
  {
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      required: true,
      set: function (input) {
        return validator.escape(input);
      },
    },
    calendar: { type: mongoose.Schema.Types.ObjectId, ref: "Calendar" },
  },
  { versionKey: false }
);

export const Event = model("Event", eventSchema);

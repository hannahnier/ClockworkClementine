import mongoose from "mongoose";
import validator from "validator";

const { Schema, model } = mongoose;
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      set: function (input) {
        return validator.escape(input);
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validator: validator.isEmail,
      set: function (input) {
        return validator.escape(input);
      },
    },
    password: {
      type: String,
      required: true,
      set: function (input) {
        return validator.escape(input);
      },
    },
    calendars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Calendar" }],
    rememberMe: { type: Boolean },
  },
  { versionKey: false }
);

export const User = model("User", userSchema);

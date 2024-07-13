import mongoose from "mongoose";
import validator from "validator";

const { Schema, model } = mongoose;
const userSchema = new Schema(
  {
    username: {
      type: String,
      set: function (input) {
        return validator.escape(input);
      },
    }, // hier später wieder required einfügen
    email: {
      type: String,
      set: function (input) {
        return validator.escape(input);
      },
    }, // hier später wieder required einfügen und unique (und validator.isEmail)
    password: {
      type: String,
      set: function (input) {
        return validator.escape(input);
      },
    }, // hier später wieder required einfügen
    calendars: { type: mongoose.Schema.Types.ObjectId, ref: "Calendars" },
    rememberMe: { type: Boolean },
  },
  { versionKey: false }
);

export const User = model("User", userSchema);

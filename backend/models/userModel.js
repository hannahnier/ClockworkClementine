import mongoose from "mongoose";

const { Schema, model } = mongoose;
const userSchema = new Schema(
  {
    username: { type: String }, // hier später wieder required einfügen
    email: { type: String }, // hier später wieder required einfügen und unique
    password: { type: String }, // hier später wieder required einfügen
    calendars: { type: mongoose.Schema.Types.ObjectId, ref: "Calendars" },
    rememberMe: { type: Boolean },
  },
  { versionKey: false }
);

export const User = model("User", userSchema);

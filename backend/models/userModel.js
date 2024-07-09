import mongoose from "mongoose";

const { Schema, model } = mongoose;
const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    calendars: { type: mongoose.Schema.Types.ObjectId, ref: "Calendar" },
  },
  { versionKey: false }
);

export const User = model("User", userSchema);

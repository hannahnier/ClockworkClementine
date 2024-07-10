import mongoose from "mongoose";

const { Schema, model } = mongoose;
const userSchema = new Schema(
  {
    username: { type: String }, // hier später wieder required einfügen
    email: { type: String, unique: true }, // hier später wieder required einfügen
    password: { type: String }, // hier später wieder required einfügen
    calendars: { type: mongoose.Schema.Types.ObjectId, ref: "Calendar" },
  },
  { versionKey: false }
);

export const User = model("User", userSchema);

import mongoose from "mongoose";

// Connect to the database:
export const connectToDb = async (url) => {
  mongoose.connection.on("connected", () => console.log("DB connected"));
  mongoose.connection.on("error", (error) => console.log("DB error: ", error));
  return mongoose.connect(url);
};

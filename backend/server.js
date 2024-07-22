import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectToDb } from "./utils/dbConnect.js";
import { errorMiddleware } from "./controller/errorMiddleware.js";
import { userRouter } from "./router/userRouter.js";
import { calendarRouter } from "./router/calendarRouter.js";
import { eventRouter } from "./router/eventRouter.js";

// Load environment variables:
dotenv.config();
const { DB_CONNECTION_STRING, PORT, NODE_ENV } = process.env;
const port = PORT || 3000;

console.log("Environment:", NODE_ENV);

// Create express app:
export const app = express();

// Middleware:
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://clockworkclementine.onrender.com",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

// Connect to the database:
if (NODE_ENV === "production" || NODE_ENV === "development") {
  await connectToDb(DB_CONNECTION_STRING);
}

// Routes:
app.use("/users", userRouter);
app.use("/calendars", calendarRouter);
app.use("/api", eventRouter);
app.use(errorMiddleware);

// Start server:
if (NODE_ENV === "production" || NODE_ENV === "development") {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

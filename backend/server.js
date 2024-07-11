import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectToDb } from "./utils/dbConnect.js";
import { errorMiddleware } from "./controller/errorMiddleware.js";
import { userRouter } from "./router/userRouter.js";
import { calendarRouter } from "./router/calendarRouter.js";

dotenv.config();
const { DB_CONNECTION_STRING, PORT } = process.env;

const port = PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

await connectToDb(DB_CONNECTION_STRING);

app.use("/users", userRouter);
app.use("/calendars", calendarRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

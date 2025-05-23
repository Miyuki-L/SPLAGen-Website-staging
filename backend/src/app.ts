/**
 * Initializes mongoose and express.
 */

import cors from "cors";
import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import { isHttpError } from "http-errors";
import mongoose from "mongoose";

import { mongoURI } from "./config";
import announcementRoutes from "./routes/announcement";
import directoryRoutes from "./routes/directory";
import discussionRoutes from "./routes/discussion";
import replyRoutes from "./routes/reply";
import userRoutes from "./routes/user";

// Load environment variables
dotenv.config();

// Connect to MongoDB
void mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to Database.");
  })
  .catch((error: unknown) => {
    console.log("DB connectivity error");
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }
  });

const app: Express = express();
const port = process.env.PORT ?? 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sets the "Access-Control-Allow-Origin" header on all responses to allow
// requests from the frontend, which has a different origin - see the following
// pages for more info:
// https://expressjs.com/en/resources/middleware/cors.html
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
  }),
);

app.use("/api/announcements", announcementRoutes);
app.use("/api/users", userRoutes);
app.use("/api/discussions", discussionRoutes);
app.use("/api/replies", replyRoutes);
app.use("/api/directory", directoryRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Error handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  // 500 is the "internal server error" error code, this will be our fallback
  let statusCode = 500;
  let errorMessage = "An error has occurred.";

  // Check if the error is an instance of HttpError
  if (isHttpError(error)) {
    // error.status is unique to the http error class, it allows us to pass status codes with errors
    statusCode = error.status;
    errorMessage = error.message;
  }
  // prefer custom http errors but if they don't exist, fallback to default
  else if (error instanceof Error) {
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
});

// Start the server
app.listen(port, () => {
  //eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

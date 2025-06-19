import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import eventRoutes from "./routes/eventRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes"
import reportRoute from "./routes/reportRoutes"
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(cookieParser());

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/events", eventRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/contact", reportRoute);

app.use((req: Request, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "Unknown error Message!";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;

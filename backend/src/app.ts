import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import eventRoutes from "./routes/events";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
import { verifyToken } from "./middleware/verifyToken";

const app = express();

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

interface AuthenticatedRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
}

app.get("/api/check-auth", verifyToken, (req: AuthenticatedRequest, res, next) => {
  try {
    res.json({ message: "You are authenticated", user: req.user });
    return;
  } catch (error) {
    next(error);
  }
  
});

app.use("/api/events", eventRoutes);

app.use("/api/auth", authRoutes);

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

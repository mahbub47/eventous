import { RequestHandler } from "express";
import adminModel from "../models/adminModel";
import jwt, { SignOptions } from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/authenticationRequest";
import eventModel from "../models/eventModel";
import createHttpError from "http-errors";

export const adminLogin: RequestHandler = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await adminModel.findOne({ username, password });
    if (!admin) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    if (admin) {
      const jwtSecret = process.env.JWT_SECRET || "secret123!";
      const jwtExpiry = process.env.JWT_EXPIRES_IN || "1d";

      const json_token = jwt.sign(
        { username: admin.username },
        jwtSecret as string,
        { expiresIn: jwtExpiry } as SignOptions
      );
      res.cookie("adminToken", json_token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        message: "Admin authentication completed",
      });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid credentials", error: error });
  }
};


export const checkAuthAdmin: RequestHandler = (req, res, next) => {
  try {
    const user = (req as AuthenticatedRequest).user;
    res.json({
      message: "You are authenticated",
      username: user?.username,
      isAuthenticated: true,
    });
    return;
  } catch (error) {
    console.log("CHECK AUTH ERROR!!!", error);
    next(error);
  }
};

export const getPendingEvents: RequestHandler = async (req, res) => {
  try {
    const events = await eventModel.find({ pendingStatus: true }).exec();
    if (!events) {
      throw createHttpError(404, "No events found for this user");
    }
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

export const approveEvent: RequestHandler<
  { eventId: string },
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  const { eventId } = req.params;
  try {
    await eventModel.findByIdAndUpdate(eventId, { pendingStatus: false }).exec();
    res.status(200).json({ message: "Event published successfully" });
  } catch (error) {
    console.error("Error publishing event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
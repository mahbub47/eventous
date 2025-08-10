import { RequestHandler } from "express";
import { AuthenticatedRequest } from "../types/authenticationRequest";
import userModel from "../models/userModel";
import mongoose from "mongoose";
import bookingModel from "../models/bookingModel";

export const createBooking: RequestHandler<
  { eventId: string },
  unknown,
  { note?: string; },
  unknown
> = async (req, res) => {
  try {
    const { eventId } = req.params;
  const userId = (req as AuthenticatedRequest).user._id;
  const { note } = req.body ?? {};

  const isValidId = mongoose.Types.ObjectId.isValid(eventId);
  const user = await userModel.findById(userId);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  if (!isValidId) {
    res.status(400).json({ message: "Invalid event ID" });
    return;
  }

  const existingBooking = await bookingModel.findOne({
    user: userId,
    event: eventId
  });

if (existingBooking) {
  res.status(400).json({ message: "You have already booked this event." });
  return;
}

  await bookingModel.create({
    event: eventId,
    user: userId,
    note,
  });

  res.status(201).json({ message: "Booking created successfully" });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

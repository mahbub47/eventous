import { RequestHandler } from "express";
import { AuthenticatedRequest } from "../types/authenticationRequest";
import userModel from "../models/userModel";
import mongoose from "mongoose";
import bookingModel from "../models/bookingModel";

interface createBookingRequest {
  note?: string;
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
}

export const createBooking: RequestHandler<
  { eventId: string },
  unknown,
  createBookingRequest,
  unknown
> = async (req, res) => {
  try {
    console.log(req.body);
    console.log("Event ID:", req.params.eventId);
    const { eventId } = req.params;
  const userId = (req as AuthenticatedRequest).user._id;
  const { note, name, email, address, phone } = req.body;

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
    name: name,
    email: email,
    address: address,
    phone: phone,
    note: note
  });

  res.status(201).json({ message: "Booking created successfully" });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

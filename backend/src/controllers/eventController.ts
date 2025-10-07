import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import eventModel from "../models/eventModel";
import { AuthenticatedRequest } from "../types/authenticationRequest";
import userModel from "../models/userModel";
import path from "path";
import fs from "fs";

export const getEvents: RequestHandler = async (req, res, next) => {
  try {
    const events = await eventModel.find({ pendingStatus: false }).exec();
    if (!events) {
      throw createHttpError(404, "No event found");
    }
    res.status(200).json({ events: events });
  } catch (error) {
    next(error);
  }
};

export const getEvent: RequestHandler = async (req, res, next) => {
  const eventId = req.params.eventID;
  try {
    if (!mongoose.isValidObjectId(eventId)) {
      throw createHttpError(400, "Invalid event id");
    }
    const event = await eventModel.findById(eventId).exec();
    if (!event) {
      throw createHttpError(404, "Event not found");
    }
    console.log("Event found:", event.eventTitle);
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

export const updateEventDescription: RequestHandler = async (req, res, next) => {
  const eventId = req.params.eventID;
  const { eventDescription } = req.body;

  try {
    if (!mongoose.isValidObjectId(eventId)) {
      throw createHttpError(400, "Invalid event id");
    }
    const event = await eventModel.findById(eventId).exec();
    if (!event) {
      throw createHttpError(404, "Event not found");
    }
    event.eventDescription = eventDescription;
    await event.save();
    res.status(200).json({ message: "Event description updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const queryMyEvents: RequestHandler<
  unknown,
  unknown,
  unknown,
  {
    search?: string;
  }
> = async (req, res) => {
  const { search = "" } = req.query;

  try {
    const events = await eventModel.find({
      $or: [
        { eventTitle: { $regex: search, $options: "i" } },
        { eventSubtitle: { $regex: search, $options: "i" } },
        { eventDescription: { $regex: search, $options: "i" } },
        { eventLocation: { $regex: search, $options: "i" } },
      ],
      pendingStatus: false
    });

    res.status(200).json(events);
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    return;
  }
};

export const getMyEvents: RequestHandler = async (req, res) => {
  const userId = (req as AuthenticatedRequest).user._id;
  try {
    const events = await eventModel.find({ createdBy: userId, pendingStatus: false }).exec();
    if (!events) {
      throw createHttpError(404, "No events found for this user");
    }
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

interface CreateEventBody {
  eventTitle?: string;
  eventSubtitle?: string;
  eventDate?: string;
  eventStartTime?: string;
  eventEndTime?: string;
  eventLocation?: string;
  eventDescription?: string;
  eventPrice?: string;
  createdBy?: string;
  eventCoverImage?: string;
  totalTickets?: string;
}

export const createEvent: RequestHandler<
  unknown,
  unknown,
  CreateEventBody,
  unknown
> = async (req, res, next) => {
  const userId = (req as AuthenticatedRequest).user._id;
  const {
    eventTitle,
    eventSubtitle,
    eventDate,
    eventStartTime,
    eventEndTime,
    eventLocation,
    eventPrice,
    eventDescription,
    totalTickets
  } = req.body;
  console.log("Total Tickets:", totalTickets);

  try {
    if (!eventTitle || !eventLocation || !eventDescription || !eventPrice) {
      throw createHttpError(400, "Invalid Request");
    }
    const newEvent = await eventModel.create({
      eventTitle: eventTitle,
      eventSubtitle: eventSubtitle,
      eventDate: eventDate,
      eventStartTime: eventStartTime,
      eventEndTime: eventEndTime,
      eventLocation: eventLocation,
      eventDescription: eventDescription,
      eventPrice: eventPrice,
      createdBy: userId,
      eventCoverImage: `/uploads/event-covers/${req.file?.filename}`,
      pendingStatus: true,
      totalTickets: totalTickets,
    });
    res
      .status(201)
      .json({ message: "Event will be published after a review", event: newEvent });
  } catch (error) {
    next(error);
  }
};

interface saveEventBody {
  save?: boolean;
}

export const saveEvent: RequestHandler<
  { eventID: string },
  unknown,
  saveEventBody,
  unknown
> = async (req, res) => {
  try {
    const eventId = req.params.eventID;
    const { save } = req.body;
    const userId = (req as AuthenticatedRequest).user._id;

    const update = save
      ? { $addToSet: { savedEvents: eventId } }
      : { $pull: { savedEvents: eventId } };

    const message = save ? "Saved" : "Unsaved";

    await userModel.findByIdAndUpdate(userId, update);
    res.status(200).json({ message: message });
  } catch (error) {
    res.status(400).json({ message: "Something isn't right", error: error });
  }
};

interface UpdateEventParams {
  eventID: string;
}

interface UpdateEventBody {
  title?: string;
  subtitle?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  description?: string;
  price?: string;
}

export const updateEvent: RequestHandler<
  UpdateEventParams,
  unknown,
  UpdateEventBody,
  unknown
> = async (req, res, next) => {
  const eventId = req.params.eventID;

  const newTitle = req.body.title;
  const newSubtitle = req.body.subtitle;
  const newDate = req.body.date;
  const newStartTime = req.body.startTime;
  const newEndTime = req.body.startTime;
  const newEventLocation = req.body.location;
  const newDescription = req.body.description;
  const newPrice = req.body.price;

  try {
    if (!mongoose.isValidObjectId(eventId)) {
      throw createHttpError(400, "Invalid event id");
    }

    if (!newTitle || !newEventLocation || !newDescription || !newPrice) {
      throw createHttpError(400, "Invalid Request");
    }

    const event = await eventModel.findById(eventId).exec();

    if (!event) {
      throw createHttpError(404, "Event not found");
    }

    event.eventTitle = newTitle;
    event.eventSubtitle = newSubtitle;
    event.eventDate = newDate;
    event.eventStartTime = newStartTime;
    event.eventEndTime = newEndTime;
    event.eventLocation = newEventLocation;
    event.eventDescription = newDescription;
    event.eventPrice = newPrice;

    const updatedEvent = await event.save();

    res.status(200).json(updatedEvent);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent: RequestHandler = async (req, res, next) => {
  try {
    const { eventID } = req.params;

    const event = await eventModel.findById(eventID);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    if (event.eventCoverImage) {
      const filePath = path.join(__dirname, "../../uploads/event-covers", event.eventCoverImage);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }

    await eventModel.findByIdAndDelete(eventID);

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    next(error);
  }
};

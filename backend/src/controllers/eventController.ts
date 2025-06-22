import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import eventModel from "../models/eventModel";
import { AuthenticatedRequest } from "../types/authenticationRequest";

export const getEvents: RequestHandler = async (req, res, next) => {
  try {
    const events = await eventModel.find().exec();
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
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

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
  } = req.body;

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
    });
    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    next(error);
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
  const eventId = req.params.eventID;

  try {
    if (!mongoose.isValidObjectId(eventId)) {
      throw createHttpError(400, "Invalid event id");
    }

    const event = await eventModel.findById(eventId).exec();

    if (!event) {
      throw createHttpError(404, "Event not found");
    }

    await event.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

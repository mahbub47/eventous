import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import eventModel from "../models/event";

export const getEvents: RequestHandler = async (req, res, next) => {
  try {
    const events = await eventModel.find().exec();
    if (!events) {
      throw createHttpError(404, "No event found");
    }
    res.status(200).json(events);
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
  title?: string;
  subtitle?: string;
  date?: Date;
  time?: string;
  location?: string;
  description?: string;
  price?: number;
}

export const createEvent: RequestHandler<
  unknown,
  unknown,
  CreateEventBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const date = req.body.date;
  const time = req.body.time;
  const location = req.body.location;
  const description = req.body.description;
  const price = req.body.price;

  try {
    if (!title || !location || !description || !price) {
      throw createHttpError(400, "Invalid Request");
    }
    const newEvent = await eventModel.create({
      title: title,
      subtitle: subtitle,
      date: date,
      time: time,
      location: location,
      description: description,
      price: price,
    });
    res.status(201).json(newEvent);
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
  date?: Date;
  time?: string;
  location?: string;
  description?: string;
  price?: number;
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
  const newTime = req.body.time;
  const newLocation = req.body.location;
  const newDescription = req.body.description;
  const newPrice = req.body.price;

  try {

    if (!mongoose.isValidObjectId(eventId)) {
      throw createHttpError(400, "Invalid event id");
    }

    if (!newTitle || !newLocation || !newDescription || !newPrice) {
      throw createHttpError(400, "Invalid Request");
    }

    const event = await eventModel.findById(eventId).exec();

    if (!event) {
      throw createHttpError(404, "Event not found");
    }

    event.title = newTitle;
    event.subtitle = newSubtitle;
    event.date = newDate;
    event.time = newTime;
    event.location = newLocation;
    event.description = newDescription;
    event.price = newPrice;

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
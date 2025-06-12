import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import userModel from "../models/userModel";


export const getUser: RequestHandler = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    if (!mongoose.isValidObjectId(userId)) {
      throw createHttpError(400, "Invalid user id");
    }
    const user = await userModel.findById(userId).exec();
    if (!user) {
      throw createHttpError(404, "User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import userModel from "../models/userModel";
import { AuthenticatedRequest } from "../types/authenticationRequest";
import path from "path";
import fs from "fs";

interface UserBody {
  username?: string;
  phone?: string;
  jobTitle?: string;
  organization?: string;
  website?: string;
  address?: string;
  address2?: string;
  city?: string;
  zipCode?: string;
}

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

type UserParam = {
  userId?: string;
};

export const updateUser: RequestHandler<
  UserParam,
  unknown,
  UserBody,
  unknown
> = async (req, res, next) => {
  const userId = (req as AuthenticatedRequest).user._id;
  const {
    username,
    phone,
    jobTitle,
    organization,
    website,
    address,
    address2,
    city,
    zipCode,
  } = req.body;

  try {
    if (!mongoose.isValidObjectId(userId)) {
      throw createHttpError(400, "Invalid event id");
    }

    const user = await userModel.findById(userId).exec();

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    user.name = username;
    user.phone = phone;
    user.jobTitle = jobTitle;
    user.organization = organization;
    user.website = website;
    user.address = address;
    user.address2 = address2;
    user.city = city;
    user.zip = zipCode;

    if (req.file && user.profileImage) {
      const oldImagePath = path.join(__dirname, "../../", user.profileImage);
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error("Error deleting old image:", err.message);
        } else {
          console.log("Old image deleted successfully");
        }
      });
    }

    if (req.file) {
      user.profileImage = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Your account information has been updated",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

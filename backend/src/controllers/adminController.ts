import { RequestHandler } from "express";
import adminModel from "../models/adminModel";
import jwt, { SignOptions } from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/authenticationRequest";
import eventModel from "../models/eventModel";
import createHttpError from "http-errors";
import { transporter } from "../utils/emailSenderConfig";
import userModel from "../models/userModel";

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
    const event = await eventModel.findById(eventId).exec();
    const user = await userModel.findById(event?.createdBy).exec();
    await transporter.sendMail({
        from: `"Eventous" <${process.env.EMAIL_USER}>`,
        to: user?.email,
        subject: `Your Event ${event?.eventTitle} Has Been Published Successfully!`,
        html: `
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="font-family: 'Poppins', sans-serif; background-color: #ffffff;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); align: center;">
          <tr>
            <td style="background-color: #FFD60A; color: #000; text-align: center; padding: 20px; font-size: 24px; font-weight: bold; border-top-left-radius: 8px; border-top-right-radius: 8px;">
              Event Published Successfully 🎉
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px; color: #333333;">
              <p style="font-size: 16px; margin-bottom: 20px;">Hello <strong>${user?.name || "Organizer"}</strong>,</p>
              <p style="font-size: 15px; line-height: 1.6; margin-bottom: 25px;">
                Great news! Your event, <strong>${event?.eventTitle}</strong>, has been reviewed and successfully published on our platform.
              </p>
              <p style="font-size: 15px; line-height: 1.6; margin-bottom: 25px;">
                You can now manage your event details, view participant registrations, and track engagement directly from your organizer dashboard.
              </p>
              <p style="font-size: 15px; line-height: 1.6; margin-bottom: 25px;">
                <strong>Event Details:</strong><br>
                📅 Date: ${event?.eventDate}<br>
                📍 Location: ${event?.eventLocation}<br>
                🔗 View Event: <a href="${process.env.CLIENT_URL}/events/${eventId}" style="color: #007bff; text-decoration: underline;">LINK</a>
              </p>
              <p style="font-size: 15px; line-height: 1.6; margin-bottom: 25px;">
                Thank you for choosing our platform to host your event. We’re excited to see it go live!
              </p>
              <p style="font-size: 15px; margin-top: 20px;">Best regards,</p>
              <p style="font-size: 15px; font-weight: bold; color: #000;">The Eventous Team</p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f1f1f1; text-align: center; padding: 15px; font-size: 13px; color: #777777; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
              © 2025 Eventous. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
          `,
      });
    res.status(200).json({ message: "Event published successfully" });
  } catch (error) {
    console.error("Error publishing event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
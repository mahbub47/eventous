import axios from "axios";
import { NextFunction, Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import userModel from "../models/userModel";
import { transporter } from "../utils/emailSenderConfig";
import { generateOTP } from "../utils/generateOtp";

export const googleAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { token } = req.body;

    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/tokeninfo",
      {
        params: { access_token: token },
      }
    );

    const { email } = response.data;
    if (!email) {
      res.status(400).json({ message: "Invalid token" });
      return;
    }

    let user = await userModel.findOne({ email });
    if (!user) {
      user = await userModel.create({
        name: "",
        email: email,
        role: "attendee",
      });
    }

    const jwtSecret = process.env.JWT_SECRET || "secret123!";
    const jwtExpiry = process.env.JWT_EXPIRES_IN || "1d";

    const json_token = jwt.sign(
      { _id: user._id, email },
      jwtSecret as string,
      { expiresIn: jwtExpiry } as SignOptions
    );

    res.status(200).json({ message: "Success", token: json_token, user });
  } catch (error) {
    console.error("Error in googleAuthController:", error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};

const otpStore = new Map<string, string>();

export const sendOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const otp = generateOTP();

    otpStore.set(email, otp);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your One-Time Password (OTP) for Eventous Login",
      html: `
      <div style="max-width: 600px; margin: auto; padding: 24px 48px; font-family: 'Poppins', sans-serif; background-color: #ffffff; border-radius: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.05); text-align: center;">
        <h1 style="color: #000000; font-size: 32px; margin-bottom: 8px; font-weight: 300; margin-bottom: 30px;">Eventous</h1>
        <h2 style="color: #222222; font-size: 18px; margin-bottom: 16px;">Verify your Eventous sign-up</h2>
        <p style="font-size: 14px; color: #555555; margin-bottom: 32px;">
          We received a request to log in to your Eventous account. Use the OTP below to verify your identity and complete the login.
        </p>
        <div style="background-color: #FFD60A; color: #000000; font-size: 24px; font-weight: bold; padding: 16px; border-radius: 8px;       margin-bottom: 24px; width: 100%; text-align: center; box-sizing: border-box;">
          ${otp}
        </div>
        <p style="font-size: 12px; color: #777777; margin-bottom: 32px;">
          This code will expire in 10 minutes. Please do not share this code with anyone for security reasons.
        </p>
        <p style="font-size: 12px; color: #777777;">
          If you did not request this code, please ignore this email or contact our support team.
        </p>
        <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #999999;">
          © 2025 Eventous. All rights reserved.
        </p>
      </div>
    `,
    });

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    next(error);
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const storedOtp = otpStore.get(email);

    if (storedOtp === otp) {
      let user = await userModel.findOne({ email });
      if (!user) {
        user = await userModel.create({
          name: "",
          email: email,
          role: "attendee",
        });
      }
      otpStore.delete(email);
      const jwtSecret = process.env.JWT_SECRET || "secret123!";
      const jwtExpiry = process.env.JWT_EXPIRES_IN || "1d";

      const json_token = jwt.sign(
        { email },
        jwtSecret as string,
        { expiresIn: jwtExpiry } as SignOptions
      );

      res.status(200).json({ message: "Success", token: json_token, user });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid OTP", error: error });
  }
};

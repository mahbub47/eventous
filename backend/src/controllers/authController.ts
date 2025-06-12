import axios from "axios";
import { RequestHandler } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import Otp from "../models/otpModel";
import userModel from "../models/userModel";
import { transporter } from "../utils/emailSenderConfig";
import { generateOTP } from "../utils/generateOtp";
import { AuthenticatedRequest } from "../types/authenticationRequest";

export const googleAuthController: RequestHandler = async (
  req,
  res,
  next
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
      { _id: user._id, email: email },
      jwtSecret as string,
      { expiresIn: jwtExpiry } as SignOptions
    );
    res.cookie("token", json_token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Success", token: json_token, user });
  } catch (error) {
    console.error("Error in googleAuthController:", error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};

export const sendOTP: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body;

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.deleteMany({ email });

    await Otp.create({ email, otp, expiresAt });

    await transporter.sendMail({
      from: `"Eventous" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `${otp} is your otp for Eventous Login`,
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

export const verifyOTP: RequestHandler = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await Otp.findOne({ email });

    if (!record) {
      res.status(400).json({ message: "OTP not found" });
      return;
    }

    if (record!.expiresAt < new Date()) {
      await Otp.deleteOne({ _id: record!._id });
      res.status(410).json({ message: "OTP expired" });
      return;
    }
    if (record!.otp !== otp) {
      res.status(400).json({ message: "Invalid OTP" });
      return;
    }

    if (record!.otp === otp) {
      let user = await userModel.findOne({ email });
      if (!user) {
        user = await userModel.create({
          name: "",
          email: email,
          role: "attendee",
        });
      }
      console.log("THIS IS MY OTP VERIFIED USER: ", user);
      const jwtSecret = process.env.JWT_SECRET || "secret123!";
      const jwtExpiry = process.env.JWT_EXPIRES_IN || "1d";

      const json_token = jwt.sign(
        { _id: user._id, email: email },
        jwtSecret as string,
        { expiresIn: jwtExpiry } as SignOptions
      );
      await Otp.deleteOne({ _id: record!._id });
      res.cookie("token", json_token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        message: "Email verification completed",
        token: json_token,
        user,
      });
      return;
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid OTP", error: error });
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });
    console.log("USER LOGGED OUT SUCCESSFULLY!!!");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};


export const checkAuth: RequestHandler = (req, res, next) => {
  try {
    const user = (req as AuthenticatedRequest).user;
    console.log("THIS IS USER FROM BACKEND AUTH:", user._id);
    res.json({
      message: "You are authenticated",
      userId: user._id,
      isAuthenticated: true,
    });
    return;
  } catch (error) {
    console.log("THE PROBLEM IS HERE!!!", error);
    next(error);
  }
};

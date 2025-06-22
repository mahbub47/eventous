import { RequestHandler } from "express";
import { transporter } from "../utils/emailSenderConfig";

interface SendReportBody {
  username?: string;
  email?: string;
  message?: string;
}

export const sendReport: RequestHandler<
  unknown,
  unknown,
  SendReportBody,
  unknown
> = async (req, res): Promise<void> => {
  const { username, email, message } = req.body;

  if (!username || !email || !message)
    res.status(400).json({ error: "All fields are required" });

  try {

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER || "eventous.help@gmail.com",
      subject: `Contact from ${username}`,
      text: message,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email" });
  }
};

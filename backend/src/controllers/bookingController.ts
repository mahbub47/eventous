import { RequestHandler } from "express";
import mongoose from "mongoose";
import eventModel from "../models/eventModel";
import { SslCommerz } from "@siamf/sslcommerz";
import userModel from "../models/userModel";
import bookingModel from "../models/bookingModel";
import { AuthenticatedRequest } from "../types/authenticationRequest";

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
  const store_id = process.env.STORE_ID!;
  const store_passwd = process.env.STORE_PASS!;
  const is_live = false;

  const sslcz = new SslCommerz(store_id, store_passwd, is_live);
  try {
    const transactionId = new mongoose.Types.ObjectId().toString();
    const userId = (req as AuthenticatedRequest).user._id;
    const { eventId } = req.params;
    const { note, name, email, address, phone } = req.body;
    const event = await eventModel.findById(eventId).exec();
    const data = {
      total_amount: Number(event?.eventPrice) || 0,
      currency: "BDT",
      tran_id: transactionId,
      success_url: `${process.env.BASE_URL}/api/bookings/success/${transactionId}`,
      fail_url: "http://localhost:3030/fail",
      cancel_url: "http://localhost:3030/cancel",
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "Courier" as const,
      product_name: "Computer.",
      product_category: "Event",
      product_profile: "general" as const,
      cus_name: name ?? "",
      cus_email: email ?? "",
      cus_add1: address ?? "",
      cus_add2: address ?? "",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: phone ?? "",
      cus_fax: "01711111111",
      ship_name: name ?? "",
      ship_add1: address ?? "",
      ship_add2: address ?? "",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: "1000",
      ship_country: "Bangladesh",
      productcategory: "Event",
      emi_option: 0,
      num_of_item: 1,
    };
    console.log("Booking data:", data);

    sslcz.init(data).then(async (apiResponse) => {
      const GatewayPageURL = apiResponse.GatewayPageURL;
      if (GatewayPageURL) {
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
          event: eventId,
        });

        if (existingBooking) {
          res
            .status(400)
            .json({ message: "You have already booked this event." });
          return;
        }

        await bookingModel.create({
          event: eventId,
          user: userId,
          name: name,
          email: email,
          address: address,
          phone: phone,
          note: note,
          paidStatus: false,
          transactionId: transactionId,
        });
        res.json({ url: GatewayPageURL });
        console.log("Redirecting to: ", GatewayPageURL);
      } else {
        res.status(500).json({ message: "Payment gateway URL not found." });
        console.error("GatewayPageURL is undefined:", apiResponse);
      }
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const successBooking: RequestHandler<
  { tranId: string },
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  const { tranId } = req.params;
  console.log("Transaction ID:", tranId);
  const result = await bookingModel.findOneAndUpdate(
    { transactionId: tranId },
    { $set: { paidStatus: true } }
  );
  if (!result) {
    console.error("Booking not found for transaction ID:", tranId);
    res.status(404).json({ message: "Booking not found" });
    return;
  }
  res.redirect(`${process.env.CLIENT_URL}/success-payment`);
};

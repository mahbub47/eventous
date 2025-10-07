import { SslCommerz } from "@siamf/sslcommerz";
import { RequestHandler } from "express";
import mongoose from "mongoose";
import bookingModel from "../models/bookingModel";
import eventModel from "../models/eventModel";
import userModel from "../models/userModel";
import { AuthenticatedRequest } from "../types/authenticationRequest";
import { transporter } from "../utils/emailSenderConfig";

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

    if (event?.eventPrice === "0") {
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
        paidStatus: true,
        transactionId: transactionId,
        eventName: event?.eventTitle || "Unknown Event",
      });

      await eventModel.findByIdAndUpdate(eventId, {
        totalSoldTickets: (Number(event.totalSoldTickets) + 1).toString(),
      });

      res.json({
        message: "Booking created successfully for free event",
        url: `${process.env.CLIENT_URL}`,
      });
      return;
    }
    const data = {
      total_amount: Number(event?.eventPrice) || 0,
      currency: "BDT",
      tran_id: transactionId,
      success_url: `${process.env.BASE_URL}/api/bookings/success/${transactionId}`,
      fail_url: `${process.env.BASE_URL}/api/bookings/failed`,
      cancel_url: `${process.env.BASE_URL}/api/bookings/cancelled`,
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
          eventName: event?.eventTitle || "Unknown Event",
        });
        await eventModel.findByIdAndUpdate(eventId, {
          totalSoldTickets: (Number(event?.totalSoldTickets) + 1).toString(),
        });
        res.json({
          message: "Redirecting to payment gateway...",
          url: GatewayPageURL,
        });
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

  const booking = await bookingModel.findOne({ transactionId: tranId }).exec();
  const user = await userModel.findById(booking?.user).exec();
  const event = await eventModel.findById(booking?.event).exec();

  if (!result) {
    console.error("Booking not found for transaction ID:", tranId);
    res.status(404).json({ message: "Booking not found" });
    return;
  }

  await transporter.sendMail({
    from: `"Eventous" <${process.env.EMAIL_USER}>`,
    to: user?.email,
    subject: `Your Registration Payment is Successful – Awaiting Confirmation`,
    html: `
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="font-family: 'Poppins', sans-serif; background-color: #ffffff;">
    <tr>
      <td align="center">
        <!-- Card -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" class="container" style="border-radius: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.05); border: 1px solid #e5e7eb; max-width:600px; width:600px; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 8px rgba(16,24,40,0.08);">
          <!-- Header / Brand -->
          <tr>
            <td align="left" style="background:#FFD60A; padding:18px 24px;">
              <table width="100%" role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font:400 24px/1.2 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:#000;">
                    Eventous
                  </td>
                  <td align="right" style="font:400 12px/1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:#000;">
                    Order #${booking?._id}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td class="p-24" style="padding:24px;">
              <p style="margin:0 0 8px; font:600 18px/1.4 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:#111827;">
                Hi ${user?.name},
              </p>
              <p style="margin:0; font:400 14px/1.7 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:#374151;">
                Thank you for registering for <strong>${event?.eventTitle}</strong>. We have successfully received your payment of
                <strong>${event?.eventPrice}</strong> for your order <strong>#${booking?._id}</strong>.
              </p>
              <p style="margin:12px 0 0; font:400 14px/1.7 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:#374151;">
                Your registration is <strong>pending confirmation from the event organizer</strong>. You’ll receive another email once it’s approved, including your ticket/pass details.
              </p>
            </td>
          </tr>

          <!-- Order Summary -->
          <tr>
            <td class="p-24" style="padding:0 24px 16px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb; border-radius:10px;">
                <tr>
                  <td style="padding:16px; font:600 14px/1.4 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:#111827; border-bottom:1px solid #e5e7eb;">
                    Order Summary
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td class="stack" style="font:400 13px/1.6 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:#374151; padding:4px 0; width:48%;">Event</td>
                        <td class="stack" style="font:600 13px/1.6 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:#111827; padding:4px 0; width:52%;" align="right">${event?.eventTitle}</td>
                      </tr>
                      <tr>
                        <td style="font:400 13px/1.6 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:#374151; padding:4px 0;">Date</td>
                        <td style="font:600 13px/1.6 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:#111827; padding:4px 0;" align="right">${event?.eventDate}</td>
                      </tr>
                      <tr>
                        <td style="font:400 13px/1.6 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:#374151; padding:4px 0;">Location</td>
                        <td style="font:600 13px/1.6 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:#111827; padding:4px 0;" align="right">${event?.eventLocation}</td>
                      </tr>
                      <tr>
                        <td style="font:400 13px/1.6 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:#374151; padding:4px 0;">Amount Paid</td>
                        <td style="font:600 13px/1.6 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:#111827; padding:4px 0;" align="right">${event?.eventPrice}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td class="p-24" align="center" style="padding:8px 24px 24px;">
              <!-- Bulletproof button -->
              <a href="{{orderUrl}}"
                style="display:inline-block; background:#FFD60A; color:#000; text-decoration:none; font:600 14px/1 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; padding:12px 18px; border-radius:8px;">
                View Order
              </a>
            </td>
          </tr>

          <!-- Help / Footer -->
          <tr>
            <td class="p-24" style="padding:0 24px 24px;">
              <p style="margin:0; font:400 13px/1.7 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:#4b5563;">
                If you have any questions, reply to this email or contact us at <a href="mailto:{{supportEmail}}" style="color:#acacac; text-decoration:none;">eventous.help@gmail.com</a>.
              </p>
              <p style="margin:12px 0 0; font:400 12px/1.6 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color:#6b7280;">
                You are receiving this email because a payment was made for order #${booking?._id} on Eventous.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:0 24px 28px; font:400 12px/1.6 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; color:#9ca3af;">
              © 2025 Eventous • <a href="{{websiteUrl}}" style="color:#6b7280; text-decoration:none;">www.eventous.com</a>
            </td>
          </tr>
        </table>
        <!-- /Card -->
      </td>
    </tr>
  </table>
      `,
  });

  await eventModel.findByIdAndUpdate(booking?.event, {
    grossRevenue: (
      Number(event?.grossRevenue) + Number(event?.eventPrice)
    ).toString(),
  });

  res.redirect(`${process.env.CLIENT_URL}/success-payment`);
};

export const failedBooking: RequestHandler = async (req, res) => {
  res.redirect(`${process.env.CLIENT_URL}/failed-payment`);
};

export const cancelBooking: RequestHandler = async (req, res) => {
  res.redirect(`${process.env.CLIENT_URL}/`);
};

export const getBookingsByEvent: RequestHandler<
  { eventId: string },
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  const { eventId } = req.params;
  const userId = (req as AuthenticatedRequest).user._id;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const event = await eventModel.findById(eventId);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    const bookings = await bookingModel.find({ event: eventId });
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBooking: RequestHandler<
  { bookingId: string },
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const booking = await bookingModel.findById(bookingId);
    const event = await eventModel.findById(booking?.event);
    await bookingModel.findByIdAndDelete(bookingId);
    if (booking?.paidStatus) {
      await eventModel.findByIdAndUpdate(booking?.event, {
        grossRevenue: (
          Number(event?.grossRevenue) - Number(event?.eventPrice)
        ).toString(),
      });
    }
    await eventModel.findByIdAndUpdate(booking?.event, {
      totalSoldTickets: (Number(event?.totalSoldTickets) - 1).toString(),
    });
    res.status(204).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const confirmBooking: RequestHandler<
  { bookingId: string },
  unknown,
  unknown,
  unknown
> = async (req, res) => {
  const { bookingId } = req.params;
  try {
    await bookingModel.findByIdAndUpdate(bookingId, {
      bookingStatus: "confirmed",
    });
    res.status(200).json({ message: "Booking confirmed successfully" });
  } catch (error) {
    console.error("Error confirming booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyBookings: RequestHandler = async (req, res) => {
  const userId = (req as AuthenticatedRequest).user._id;
  try {
    const bookings = await bookingModel.find({ user: userId }).populate("event");
    const validBookings = bookings.filter(b => b.event !== null);
    res.json(validBookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const payBooking: RequestHandler<{ bookingId: string }> = async (
  req,
  res
) => {
  const { bookingId } = req.params;
  const store_id = process.env.STORE_ID!;
  const store_passwd = process.env.STORE_PASS!;
  const is_live = false;

  const sslcz = new SslCommerz(store_id, store_passwd, is_live);
  try {
    const booking = await bookingModel.findById(bookingId);
    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    const transactionId =
      booking.transactionId || new mongoose.Types.ObjectId().toString();
    const event = await eventModel.findById(booking.event).exec();
    const data = {
      total_amount: Number(event?.eventPrice) || 0,
      currency: "BDT",
      tran_id: transactionId,
      success_url: `${process.env.BASE_URL}/api/bookings/success/${transactionId}`,
      fail_url: `${process.env.BASE_URL}/api/bookings/failed`,
      cancel_url: `${process.env.BASE_URL}/api/bookings/cancelled`,
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "Courier" as const,
      product_name: "Computer.",
      product_category: "Event",
      product_profile: "general" as const,
      cus_name: booking.name ?? "",
      cus_email: booking.email ?? "",
      cus_add1: booking.address ?? "",
      cus_add2: booking.address ?? "",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: booking.phone ?? "",
      cus_fax: "01711111111",
      ship_name: booking.name ?? "",
      ship_add1: booking.address ?? "",
      ship_add2: booking.address ?? "",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: "1000",
      ship_country: "Bangladesh",
      productcategory: "Event",
      emi_option: 0,
      num_of_item: 1,
    };
    console.log("Booking data:", data);
    await eventModel.findByIdAndUpdate(booking?.event, {
      grossRevenue: (
        Number(event?.grossRevenue) + Number(event?.eventPrice)
      ).toString(),
    });

    sslcz.init(data).then(async (apiResponse) => {
      const GatewayPageURL = apiResponse.GatewayPageURL;
      if (GatewayPageURL) {
        res.json({ url: GatewayPageURL });
        console.log("Redirecting to: ", GatewayPageURL);
      } else {
        res.status(500).json({ message: "Payment gateway URL not found." });
        console.error("GatewayPageURL is undefined:", apiResponse);
      }
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

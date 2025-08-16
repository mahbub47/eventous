import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import * as bookingController from "../controllers/bookingController";

const router = express.Router();

router.get("/my-bookings", verifyToken, bookingController.getMyBookings);

router.post("/:bookingId/pay", verifyToken, bookingController.payBooking);

router.post("/book/:eventId", verifyToken, bookingController.createBooking);

router.post("/success/:tranId", bookingController.successBooking);

router.post("/failed", bookingController.failedBooking);

router.post("/cancelled", bookingController.cancelBooking);

router.get("/:eventId", verifyToken, bookingController.getBookingsByEvent);

router.put("/:bookingId/confirm", verifyToken, bookingController.confirmBooking);

router.delete("/:bookingId", verifyToken, bookingController.deleteBooking);

export default router;

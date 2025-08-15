import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import * as bookingController from "../controllers/bookingController";

const router = express.Router();

router.post("/book/:eventId", verifyToken, bookingController.createBooking);

router.post("/success/:tranId", bookingController.successBooking);

export default router;

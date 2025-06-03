import express from "express";
import { googleAuthController, sendOTP, verifyOTP } from "../controllers/googleAuthController";

const router = express.Router();

router.post("/google", googleAuthController);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

export default router;

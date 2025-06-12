import express from "express";
import * as AuthController from "../controllers/authController";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.post("/google", AuthController.googleAuthController);
router.post("/send-otp", AuthController.sendOTP);
router.post("/verify-otp", AuthController.verifyOTP);
router.get("/logout", AuthController.logout);
router.get("/check-auth",verifyToken, AuthController.checkAuth);

export default router;

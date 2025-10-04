import express from "express";
import * as AdminController from "../controllers/adminController";
import { verifyAdminToken } from "../middleware/verifyAdminToken";

const router = express.Router();
router.post("/login", AdminController.adminLogin);
router.get("/check-auth-admin",verifyAdminToken, AdminController.checkAuthAdmin);
router.get("/pending-events", AdminController.getPendingEvents);
router.put("/:eventId/approve", AdminController.approveEvent);

export default router;

import express from "express";
import * as UserController from "../controllers/userController";
import upload from "../middleware/multer";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get("/:userId", UserController.getUser);
router.patch(
  "/:userId",
  upload.single("profileImage"),
  verifyToken,
  UserController.updateUser
);

export default router;

import express from "express";
import * as UserController from "../controllers/userController";
import profileUpload from "../middleware/profileImageStorage";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get("/:userId", UserController.getUser);
router.patch(
  "/:userId",
  profileUpload.single("profileImage"),
  verifyToken,
  UserController.updateUser
);

export default router;

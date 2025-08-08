import express from "express";
import * as UserController from "../controllers/userController";
import profileUpload from "../middleware/profileImageStorage";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get("/:userId", UserController.getUser);

router.get("/me/followers-ids", verifyToken, UserController.getFollowersIds);

router.get("/me/saved-events", verifyToken, UserController.getSavedEvents);

router.get("/me/saved-event-ids", verifyToken, UserController.getSavedEventIds);

router.post("/:userId/follow", verifyToken, UserController.followUser);

router.get("/:userId/followers-ids", UserController.getFollowersOfUser);

router.get("/me/followers", verifyToken, UserController.getFollowers);

router.get("/me/following", verifyToken, UserController.getFollowing);

router.get("/me/following-ids", verifyToken, UserController.getFollowingIds);

router.patch(
  "/:userId",
  profileUpload.single("profileImage"),
  verifyToken,
  UserController.updateUser
);

export default router;

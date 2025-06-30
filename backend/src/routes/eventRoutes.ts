import express from "express";
import * as EventController from "../controllers/eventController";
import { verifyToken } from "../middleware/verifyToken";
import eventCoverUpload from "../middleware/eventCoverImageStorage";

const router = express.Router();

router.get("/", EventController.getEvents);

router.get("/:eventID", EventController.getEvent);

router.post(
  "/",
  eventCoverUpload.single("eventCoverImage"),
  verifyToken,
  EventController.createEvent
);

router.patch("/:eventID", EventController.updateEvent);

router.delete("/:eventID", EventController.deleteEvent);

export default router;

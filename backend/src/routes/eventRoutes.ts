import express from "express";
import * as EventController from "../controllers/eventController";
import { verifyToken } from "../middleware/verifyToken";
import eventCoverUpload from "../middleware/eventCoverImageStorage";

const router = express.Router();

router.get("/query", EventController.queryMyEvents);

router.get("/my-events", verifyToken, EventController.getMyEvents);

router.get("/", EventController.getEvents);

router.get("/:eventID", EventController.getEvent);

router.put("/:eventID/description", EventController.updateEventDescription);

router.post("/:eventID/save", verifyToken, EventController.saveEvent);

router.post(
  "/",
  eventCoverUpload.single("eventCoverImage"),
  verifyToken,
  EventController.createEvent
);

router.patch("/:eventID", EventController.updateEvent);

router.delete("/:eventID", EventController.deleteEvent);

export default router;

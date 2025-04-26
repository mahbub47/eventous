import express from "express";
import * as EventController from "../controllers/events";

const router = express.Router();

router.get("/", EventController.getEvents);

router.get("/:eventID", EventController.getEvent);

router.post("/", EventController.createEvent);

router.patch("/:eventID", EventController.updateEvent);

router.delete("/:eventID", EventController.deleteEvent);

export default router;
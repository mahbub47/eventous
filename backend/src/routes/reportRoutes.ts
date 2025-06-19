import express from "express"
import * as ReportController from "../controllers/reportController"

const router = express.Router();

router.post("/send", ReportController.sendReport);

export default router;
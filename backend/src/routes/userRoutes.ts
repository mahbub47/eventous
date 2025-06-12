import express from "express"
import * as UserController from "../controllers/userController"

const router = express.Router();

router.get("/:userId", UserController.getUser);

export default router;
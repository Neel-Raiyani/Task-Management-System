import express from "express";
const router = express.Router();
import { getMyNotifications, markAsRead } from "../controllers/notificationController.js";
import auth from "../middlewares/auth.js";

router.get('/',auth, getMyNotifications);

router.put('/mark-as-read/:notificationId', auth, markAsRead);

export default router;
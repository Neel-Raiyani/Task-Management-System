import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import{ searchTasks } from "../controllers/taskSearchController.js"

router.get('/', auth, searchTasks);

export default router;
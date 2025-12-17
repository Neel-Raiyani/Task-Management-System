import express from "express";
const router = express.Router();
import { createSubtask, deleteSubtask, toggleSubtask } from "../controllers/subtaskController.js"
import auth from "../middlewares/auth.js";

router.post('/create/:taskId', auth, createSubtask);

router.put('/toggle/:subtaskId', auth, toggleSubtask);

router.delete('/delete/:subtaskId', auth, deleteSubtask);

export default router;
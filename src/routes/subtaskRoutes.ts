import express from "express";
const router = express.Router();
import { createSubtask, deleteSubtask, toggleSubtask } from "../controllers/subtaskController.js"

router.post('/create/:taskId', createSubtask);

router.put('/toggle/:subtaskId', toggleSubtask);

router.delete('/delete/:subtaskId', deleteSubtask);

export default router;
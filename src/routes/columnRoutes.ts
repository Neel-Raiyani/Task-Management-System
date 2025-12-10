import express from "express";
import auth from "../middlewares/auth.js";
import { createColumn, renameColumn, reorderColumns } from "../controllers/columnController.js";
const router = express.Router();

router.post('/create-column', createColumn);
router.put('/rename-column/:columnId',renameColumn);
router.put('/reorder-column', reorderColumns);

export default router;
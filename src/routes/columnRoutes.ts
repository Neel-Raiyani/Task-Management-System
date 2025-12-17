import express from "express";
import auth from "../middlewares/auth.js";
import { createColumn, renameColumn, reorderColumns } from "../controllers/columnController.js";
const router = express.Router();

router.post('/create-column', auth, createColumn);
router.put('/rename-column/:columnId', auth, renameColumn);
router.put('/reorder-column', auth, reorderColumns);

export default router;
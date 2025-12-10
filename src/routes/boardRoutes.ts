import express from "express";
import auth from "../middlewares/auth.js"
import { createBoard, getWorkspaceBoards } from "../controllers/boardController.js";
const router = express.Router();

router.post('/create-board', auth, createBoard);
router.get('/workspace-boards/:workspaceId', getWorkspaceBoards);

export default router;
import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import { addComment, addReply, deleteComment, getCommentsForTask } from "../controllers/commentController.js";

router.post('/add/:taskId', auth, addComment);
router.post('/add-reply/:taskId/:parentId', auth, addReply);

router.get('/:taskId', getCommentsForTask);

router.delete('/delete/:commentId', auth, deleteComment);


export default router;
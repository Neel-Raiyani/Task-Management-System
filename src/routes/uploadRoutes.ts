import express from "express";
const router = express.Router();
import { uploadCommentFiles, uploadTaskFiles } from "../controllers/uploadController.js";
import { commentUpload } from "../middlewares/upload.js";
import { taskUpload } from "../middlewares/upload.js";
import auth from "../middlewares/auth.js";

router.put('/comment-files/:commentId', auth, commentUpload.array("files", 5), uploadCommentFiles);
router.put('/task-files/:taskId', auth, taskUpload.array("files", 5), uploadTaskFiles);

export default router;
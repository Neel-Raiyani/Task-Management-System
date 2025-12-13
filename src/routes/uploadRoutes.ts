import express from "express";
const router = express.Router();
import { uploadCommentFiles, uploadTaskFiles } from "../controllers/uploadController.js";
import { commentUpload } from "../middlewares/upload.js";
import { taskUpload } from "../middlewares/upload.js";

router.put('/comment-files/:commentId', commentUpload.array("files", 5), uploadCommentFiles);
router.put('/task-files/:taskId', taskUpload.array("files", 5), uploadTaskFiles);

export default router;
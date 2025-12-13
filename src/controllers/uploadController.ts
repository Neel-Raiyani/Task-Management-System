import { Request, Response } from "express";
import prisma from "../prisma/client.js";
import { } from "../middlewares/upload.js";



export const uploadTaskFiles = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const files = req.files as Express.Multer.File[];

        if (!taskId) return res.status(400).json({ message: "TaskId is missing" });

        if (!files || files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        const filePaths = files.map(f => f.path);

        const task = await prisma.task.update({
            where: { id: taskId },
            data: {
                attachments: { push: filePaths }
            }
        });
        res.json({ message: "Files uploaded", task });
    } catch (error) {
        console.log(error);
        res.status(500).json({ Message: "Internal Server Error!!!", error });
    }
}



export const uploadCommentFiles = async (req: Request, res: Response) => {
    try {
        const { commentId } = req.params;
        const files = req.files as Express.Multer.File[];

        if (!commentId) return res.status(400).json({ message: "CommentId is missing" });

        if (!files || files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        const filePaths = files.map(f => f.path);

        const comment = await prisma.comment.update({
            where: { id: commentId },
            data: {
                attachments: { push: filePaths }
            }
        });
         res.json({ message: "Files uploaded", comment });

    } catch (error) {
        res.status(500).json({ Message: "Internal Server Error!!!", error });
    }
}
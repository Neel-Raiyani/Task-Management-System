import { Request, Response } from "express";
import prisma from "../prisma/client.js";

export const addComment = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const { content, attachments = [] } = req.body;
        const userId = req.userId;

        if (!userId || !taskId) return res.status(400).json({ message: "UserId & taskId are required" });

        if (!content || content.trim() === "") {
            return res.status(400).json({ message: "Content is required" });
        }

        const comment = await prisma.comment.create({
            data: { taskId, userId, content, attachments, parentId: null }
        });

        return res.status(201).json({ message: "Comment added", comment });

    } catch (error) {
        res.status(500).json({ Message: "Internal server error!!!", error });
    }
}



export const addReply = async (req: Request, res: Response) => {
    try {
        const { taskId, parentId } = req.params;
        const { content, attachments = [] } = req.body;
        const userId = req.userId;

        if (!userId || !taskId || !parentId) return res.status(400).json({ message: "UserId, ParentId & taskId are required" });

        if (!content || content.trim() === "") {
            return res.status(400).json({ message: "Content is required" });
        }

        const parent = await prisma.comment.findUnique({ where: { id: parentId } });
        if (!parent) return res.status(404).json({ message: "Parent comment not found" });
        if (parent.taskId !== taskId) return res.status(400).json({ message: "Parent comment does not belong to this task" });

        const reply = await prisma.comment.create({
            data: {
                taskId,
                userId,
                content,
                attachments,
                parentId
            }
        });

        return res.status(201).json({ message: "Reply added", reply });
    } catch (error) {
        res.status(500).json({ Message: "Internal server error!!!", error });
    }
}



export const getCommentsForTask = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;

        if (!taskId) return res.status(400).json({ message: "TaskId is missing!!!" });

        const comments = await prisma.comment.findMany({
            where: { taskId },
            orderBy: { createdAt: "asc" }
        });

        return res.json({ comments });
    } catch (error) {
        res.status(500).json({ Message: "Internal server error!!!", error });
    }
}



export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { commentId } = req.params;
        const userId = req.userId;

        if (!userId || !commentId) return res.status(400).json({ message: "UserId & CommentId are required" });

        const comment = await prisma.comment.findUnique({ where: { id: commentId } });
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        if (comment.userId !== userId) {
            return res.status(403).json({ message: "You can only delete your own comments" });
        }

        await prisma.comment.delete({ where: { id: commentId } });

        return res.json({ message: "Comment deleted" });
    } catch (error) {
        res.status(500).json({ Message: "Internal server error!!!", error });
    }
}
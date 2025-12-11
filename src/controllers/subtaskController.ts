import { Request, Response } from "express";
import prisma from "../prisma/client.js";

export const createSubtask = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const { title } = req.body;

        if (!taskId) {
            return res.status(400).json({ message: "TaskId is required" });
        }

        const subtask = await prisma.subtask.create({
            data: { title, taskId }
        });

        res.status(201).json({ message: "Subtask created", subtask });
    } catch (error) {
        res.status(500).json({ Message: "Internal server error!!!", error });
    }
}



export const toggleSubtask = async (req: Request, res: Response) => {
    try {
        const { subtaskId } = req.params;

        if (!subtaskId) {
            return res.json({ message: "SubtaskId is required" });
        }

        const subtask = await prisma.subtask.findUnique({
            where: { id: subtaskId }
        });

        if (!subtask) {
            return res.status(404).json({ message: "Subtask not found!!!" });
        }

        const updated = await prisma.subtask.update({
            where: { id: subtaskId },
            data: { done: !subtask.done }
        });

        res.json({ message: "Subtask updated", subtask: updated });
    } catch (error) {
        res.status(500).json({ Message: "Internal server error!!!", error });
    }
}



export const deleteSubtask = async (req: Request, res: Response) => {
    try {
        const { subtaskId } = req.params;

        if (!subtaskId) {
            return res.json({ message: "SubtaskId is required" });
        }

        await prisma.subtask.delete({
            where: { id: subtaskId }
        });

        res.json({ message: "Subtask deleted" });
    } catch (error) {
        res.status(500).json({ Message: "Internal server error!!!", error });
    }
};
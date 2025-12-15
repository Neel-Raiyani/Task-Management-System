import { Request, Response } from "express";
import prisma from "../prisma/client.js";

export const searchTasks = async (req: Request, res: Response) => {
    try {
        const title = req.query.title as string | undefined;
        const priority = req.query.priority as string | undefined;
        const status = req.query.status as string | undefined;
        const assigneeId = req.query.assigneeId as string | undefined;
        const label = req.query.label as string | undefined;
        const boardId = req.query.boardId as string;

        if (!boardId) {
            res.status(400).json({ message: "boardId is required" });
            return;
        }

        const filter: any = { boardId };

        if (title) {
            filter.title = { contains: title, mode: "insensitive" }; 
        }

        if (priority) filter.priority = priority;
        if (status) filter.status = status;
        if (assigneeId) filter.assigneeIds = { has: assigneeId }; 
        if (label) filter.labels = { has: label }; 

        const tasks = await prisma.task.findMany({
            where: filter,
            orderBy: { dueDate: "asc" } 
        });

        res.json({ tasks });

    } catch (error) {
        console.log(error);
        res.status(500).json({ Message: "Internal Server Error!!!", error });
    }
};
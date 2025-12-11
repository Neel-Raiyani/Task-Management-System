import { Request, Response } from "express";
import prisma from "../prisma/client.js"


const verifyUserInBoardWorkspace = async (userId: string, boardId: string) => {
    const board = await prisma.board.findUnique({ where: { id: boardId } });
    if (!board) throw { status: 404, message: "Board not found!!!" }

    const workspace = await prisma.workspace.findUnique({ where: { id: board.workspaceId } })
    if (!workspace) throw { status: 404, message: "Workspace not found!!!" }

    const isMember = workspace.memberIds.includes(userId);
    if (!isMember) throw { status: 403, message: "You are not a member of this workspace" };
    return { board, workspace };
}

export const createTask = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const {
            boardId,
            columnId,
            title,
            description,
            priority,
            assigneeIds = [],
            labels = [],
            dueDate = null
        } = req.body;

        if (!userId) {
            return res.json({ message: "User ID missing" });
        }

        if (!boardId || !columnId || !title) {
            return res.status(400).json({ message: "boardId, columnId and title are required" });
        }

        await verifyUserInBoardWorkspace(userId, boardId);

        const countInColumn = await prisma.task.count({ where: { columnId } });
        const order = countInColumn;

        const task = await prisma.task.create({
            data: {
                boardId,
                columnId,
                title,
                description,
                priority,
                assigneeIds,
                labels,
                dueDate: dueDate ? new Date(dueDate) : null,
                order,
                createdBy: userId
            }
        });

        return res.status(201).json({ message: "Task created", task });

    } catch (error) {
        res.status(500).json({ Message: "Internal Server Error!!!", error });
    }
}



export const getTask = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;

        if (!taskId) {
            return res.status(400).json({ message: "Task ID is required" });
        }

        const task = await prisma.task.findUnique({
            where: { id: taskId },
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ Message: "Internal Server Error!!!", error });
    }
};



export const listBoardTasks = async (req: Request, res: Response) => {
    try {
        const { boardId } = req.params;
        const userId = req.userId;

        if (!userId || !boardId) {
            return res.json({ message: "User and Board Ids are required" })
        }

        await verifyUserInBoardWorkspace(userId, boardId);

        const tasks = await prisma.task.findMany({
            where: { boardId: boardId },
            orderBy: { order: "asc" }
        });

        return res.json({ tasks });
    } catch (error) {
        res.status(500).json({ Message: "Internal Server Error!!!", error });
    }
}



export const updateTask = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const data = req.body;

        if (!taskId) {
            return res.json({ message: "TaskId is missing!!!" })
        }

        const updated = await prisma.task.update({
            where: { id: taskId },
            data
        });

        res.json({ message: "Task updated", task: updated });
    } catch (error) {
        res.status(500).json({ Message: "Internal Server Error!!!", error });
    }
}



export const moveTask = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const { newColumnId } = req.body;

        if (!taskId) {
            return res.json({ message: "TaskId is missing!!!" })
        }

        const moved = await prisma.task.update({
            where: { id: taskId },
            data: { columnId: newColumnId }
        });

        res.json({ message: "Task moved", task: moved });
    } catch (error) {
        res.status(500).json({ Message: "Internal Server Error!!!", error });
    }
}



export const assignUser = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const { userId } = req.body;

        if (!taskId) {
            return res.json({ message: "TaskId is missing!!!" })
        }

        const updated = await prisma.task.update({
            where: { id: taskId },
            data: {
                assigneeIds: {
                    push: userId
                }
            }
        });

        res.json({ message: "User assigned", task: updated });
    } catch (error) {
        res.status(500).json({ Message: "Internal Server Error!!!", error });
    }
}



export const unassignUser = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const userId = req.userId;

        if (!taskId || !userId) {
            return res.json({ message: "TaskId and UserId are required" })
        }

        const task = await prisma.task.findUnique({ where: { id: taskId } });

        if (!task) {
            return res.json({ message: "Task not found!!!" });
        }

        const updatedAssignees = task.assigneeIds.filter(id => id !== userId);

        const updated = await prisma.task.update({
            where: { id: taskId },
            data: { assigneeIds: updatedAssignees }
        });

        res.json({ message: "User unassigned", task: updated });
    } catch (error) {
        res.status(500).json({ Message: "Internal Server Error!!!", error });
    }
}



export const addLabel = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const { label } = req.body;

        if (!taskId) {
            return res.json({ message: "TaskId is missing!!!" })
        }

        const updated = await prisma.task.update({
            where: { id: taskId },
            data: {
                labels: { push: label }
            }
        });

        res.json({ message: "Label added", task: updated });
    } catch (error) {
        res.status(500).json({ Message: "Internal Server Error!!!", error });
    }
}



export const removeLabel = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const { label } = req.body;

        if (!taskId) {
            return res.json({ message: "TaskId is missing!!!" })
        }

        const task = await prisma.task.findUnique({ where: { id: taskId } });

        if (!task) {
            return res.json({ message: "Task not found!!!" });
        }

        const updatedLabels = task.labels.filter(l => l !== label);

        const updated = await prisma.task.update({
            where: { id: taskId },
            data: {
                labels: updatedLabels
            }
        });

        res.json({ message: "Label removed", task: updated });
    } catch (error) {
        res.status(500).json({ Message: "Internal Server Error!!!", error });
    }
}



export const updatePriority = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const { priority } = req.body;

        if (!taskId) {
            return res.json({ message: "TaskId is missing!!!" });
        }

        const updated = await prisma.task.update({
            where: { id: taskId },
            data: { priority }
        });

        res.json({ message: "Priority updated", task: updated });
    } catch (error) {
        res.status(500).json({ Message: "Internal Server Error!!!", error });
    }
}



export const updateDueDate = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const { dueDate } = req.body;

        if (!taskId) {
            return res.json({ message: "TaskId is missing!!!" });
        }

        const updated = await prisma.task.update({
            where: { id: taskId },
            data: { dueDate: new Date(dueDate) }
        });

        res.json({ message: "Due date updated", task: updated });
    } catch (error) {
        res.status(500).json({ Message: "Internal Server Error!!!", error });
    }
};
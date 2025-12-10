import { Request, Response } from "express"
import prisma from "../prisma/client.js"

export const createBoard = async (req: Request, res: Response) => {
    try {
        const { title, workspaceId } = req.body;
        const userId = req.userId;

        if (!userId) {
            return res.json({ message: "User ID missing" });
        }

        if (!title || !workspaceId) {
            return res.status(400).json({ message: "Title & Workspace ID required" });
        }

        const workspace = await prisma.workspace.findUnique({
            where: { id: workspaceId }
        });

        if (!workspace) {
            return res.status(404).json({ message: "Workspace not found" });
        }

        if (!workspace.memberIds.includes(userId)) {
            return res.status(403).json({ message: "You are not a member of this workspace" });
        }

        const board = await prisma.board.create({
            data: { title, workspaceId }
        });

        res.status(201).json({ message: "Board created", board });
    } catch (error) {
        res.status(500).json({ Message: "Internal Server Error!!!", error });
    }
}



export const getWorkspaceBoards = async (req: Request, res: Response) => {
    try {
        const { workspaceId } = req.params;

        if (!workspaceId) {
            return res.status(404).json({ message: "WorkspaceId is missing" });
        }

        const boards = await prisma.board.findMany({
            where: { workspaceId },
            include: { columns: true }
        });

        res.json({ boards });
    } catch (error) {
        res.status(500).json({ Message: "Internal Server Error!!!", error });
    }
};

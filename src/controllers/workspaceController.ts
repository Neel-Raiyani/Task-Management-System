import { Request, Response } from "express";
import prisma from "../prisma/client.js";

export const createWorkspace = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const userId = req.userId as string;

        if (!userId) {
            return res.json({ message: "User ID missing" });
        }

        if (!name) {
            return res.status(400).json({ Message: "Workspace name is required" });
        }

        const workspace = await prisma.workspace.create({
            data: {
                name,
                ownerId: userId,
                memberIds: [userId]
            },
        });

        res.status(201).json({ message: "Workspace created successfully", workspace });

    } catch (error) {
        res.status(500).json({ Message: "Internal server error!!!", error });
    }
}



export const addMember = async (req: Request, res: Response) => {
    try {
        const { workspaceId, memberId } = req.body;
        const userId = req.userId as string;

        if (!userId) {
            return res.json({ message: "User ID missing" });
        }

        const workspace = await prisma.workspace.findUnique({ where: { id: workspaceId } });

        if (!workspace) {
            return res.status(404).json({ message: "Workspace not found" });
        }

        if (workspace.ownerId != userId) {
            return res.status(400).json({ Message: "Only owner can add members" })
        }

        const duplicate = await prisma.workspace.findFirst({
            where: {
                memberIds: {
                    has: memberId
                }
            }
        });

        if(duplicate){
            return res.json({Message: "User already exists!!!"});
        }

        const updated = await prisma.workspace.update({
            where: { id: workspaceId },
            data: {
                memberIds: { push: memberId }
            },
        });

        res.json({ message: "Member added successfully", workspace: updated });
    } catch (error) {
        console.log(error);
        res.status(500).json({ Message: "Internal server error!!!", error })
    }
}



export const myWorkSpaces = async (req: Request, res: Response) => {
    try {
        const userId = req.userId as string;

        if (!userId) {
            return res.json({ message: "User ID missing" });
        }

        const workspaces = await prisma.workspace.findMany({
            where: {
                memberIds: { has: userId },
            },
            omit: {ownerId: true, memberIds: true, createdAt: true}
        });

        res.json(workspaces);
    } catch (error) {
        res.status(500).json({ Message: "Internal server error!!!", error })
    }
}
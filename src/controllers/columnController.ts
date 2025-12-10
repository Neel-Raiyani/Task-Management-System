import { Request, Response } from "express";
import prisma from "../prisma/client.js";

export const createColumn = async (req: Request, res: Response) => {
    try {
        const { boardId, name } = req.body;

        if (!boardId || !name)
            return res.status(400).json({ message: "Board ID & name required" });


        const count = await prisma.column.count({ where: { boardId } });

        const column = await prisma.column.create({
            data: {
                boardId,
                name,
                order: count
            }
        });

        res.status(201).json({ message: "Column added", column });
    } catch (error) {
        res.status(500).json({ Message: "Internal server error!!!", error });
    }
}



export const renameColumn = async (req: Request, res: Response) => {
    try {
        const { columnId } = req.params;
        const { name } = req.body;

        if(!columnId){
            return res.json({message: "ColumnId missing!!!"});
        }

        const column = await prisma.column.update({
            where: { id: columnId },
            data: { name }
        });

        res.json({ message: "Column renamed", column });
    } catch (error) {
        res.status(500).json({ Message: "Internal server error!!!", error });
    }
}



export const reorderColumns = async (req: Request, res: Response) => {
    try {
        const { orderedIds } = req.body;

        for (let i = 0; i < orderedIds.length; i++) {
            await prisma.column.update({
                where: { id: orderedIds[i] },
                data: { order: i }
            });
        }

        res.json({ message: "Columns reordered" });
    } catch (error) {
        res.status(500).json({ Message: "Internal server error!!!", error });
    }
}
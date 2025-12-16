import { Request, Response } from "express";
import prisma from "../prisma/client.js";

export const getMyNotifications = async (req: Request, res: Response) => {
    try {
        const userId = req.userId
        if(!userId) return res.status(400).json({message: "UserId is missing!!!"});

        const notifications = await prisma.notification.findMany({
            where: {userId},
            orderBy: {createdAt: "desc"}
        });

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ Message: "Internal server error!!!", error });
    }
}

export const markAsRead = async (req: Request, res: Response) => {
    try {
    const { notificationId } = req.params;
    if(!notificationId) return res.status(400).json({message: "NotificationId is missing!!!"});

    await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true }
    });

    res.status(200).json({ message: "Notification marked as read" });
  }
  catch(error){
    res.status(500).json({ Message: "Internal server error!!!", error });
  }
}
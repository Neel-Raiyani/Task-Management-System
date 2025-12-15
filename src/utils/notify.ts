import { Server } from "socket.io";
import prisma from "../prisma/client.js";

export const createNotification = async (io: Server, userId: string, message: string) => {
    const notification = await prisma.notification.create({
        data: {userId, message}
    });

    io.to(`user_${userId}`).emit("notification", notification);
}

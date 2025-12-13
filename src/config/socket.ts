import { Server } from "socket.io";

let io: Server | null = null;

export const setSocket = (socketInstance: Server) => {
  io = socketInstance;
};

export const getSocket = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

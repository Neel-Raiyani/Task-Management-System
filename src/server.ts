import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import workspaceRoutes from "./routes/workspaceRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";
import columnRoutes from "./routes/columnRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import subtaskRoutes from "./routes/subtaskRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { setSocket } from "./config/socket.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1818;

connectDB();

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use("/auth", userRoutes);
app.use("/workspace", workspaceRoutes);
app.use("/board", boardRoutes);
app.use("/column", columnRoutes);
app.use("/task", taskRoutes);
app.use("/subtask", subtaskRoutes);
app.use("/comment", commentRoutes);
app.use("/upload", uploadRoutes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

setSocket(io);

io.on("connection", (socket) => {
    console.log("User connected: ", socket.id)

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on "http://localhost:${PORT}"`);
});


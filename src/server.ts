import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import workspaceRoutes from "./routes/workspaceRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";
import columnRoutes from "./routes/columnRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import subtaskRoutes from "./routes/subtaskRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 1818;

connectDB();

app.use(express.json());

app.use("/auth", userRoutes);

app.use("/workspace", workspaceRoutes);

app.use("/board", boardRoutes);

app.use("/column", columnRoutes);

app.use("/task", taskRoutes);

app.use("/subtask", subtaskRoutes);

app.listen(PORT, () => {
    console.log(`Server running on "http://localhost:${PORT}"`);
});


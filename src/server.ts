import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 1818;

connectDB();

app.use(express.json());

app.use("/auth", userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on "http://localhost:${PORT}"`);
});


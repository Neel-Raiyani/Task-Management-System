import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URI as string;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("MongoDB connected successfully!!!")

    } catch (error) {
        console.log("Database connection failed", error);
        process.exit(1);
    }
};

export default connectDB;
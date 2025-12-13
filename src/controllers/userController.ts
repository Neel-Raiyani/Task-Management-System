import { Request, Response } from "express";
import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwt_key = process.env.JWT_SECRET!;

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await prisma.user.findUnique({ where: { email }, omit: { password: true } });
        if (userExists) {
            return res.status(400).json({ message: "User already registered with this email Id, Please try again with different email." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                avatar: null,
            },
        });

        const token = jwt.sign(
            { id: user.id },
            jwt_key,
            { expiresIn: "15m" }
        );

        res.status(201).json({ Message: "User registered successfully", New_User: user, token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ Message: "Internal Server Error!!!", error });
    }
}



export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: "User not found!!!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password!!!" });
        }

        const token = jwt.sign(
            { id: user.id },
            jwt_key,
            { expiresIn: "1h" }
        );

        res.status(201).json({ Message: "User LoggedIn successfully", token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ Message: "Internal Server Error!!!", error });
    }
}



export const getUser = async (req: Request, res: Response) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ message: "No user found!!!" });
        }

        const user = await prisma.user.findUnique({ where: { id: req.userId }, omit: { password: true } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}
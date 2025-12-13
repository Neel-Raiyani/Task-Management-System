import { Request } from "express";
import { FileFilterCallback } from "multer"
import multer from "multer";
import path from "path";
import fs from "fs";

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "video/mp4", "application/pdf", "application/doc"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Invalid file type"));
};

const dynamicStorage = (folder: string) =>
    multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = `uploads/${folder}`;
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        },

        filename: (req, file, cb) =>
            cb(null, Date.now() + '-' + file.originalname)
    });

export const taskUpload = multer({
    storage: dynamicStorage("tasks"),
    fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 }
});

export const commentUpload = multer({
    storage: dynamicStorage("comments"),
    fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 }
});

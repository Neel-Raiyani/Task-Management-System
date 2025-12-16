import express from "express";
import { getUser, login, register } from "../controllers/userController.js";
import {body} from "express-validator";
import auth from "../middlewares/auth.js";
import validate from "../middlewares/validation.js";
const router = express.Router();


router.post('/register',[
    body('name').notEmpty().withMessage("Name is required"),
    body('email').isEmail().withMessage("Enter valid Email"),
    body('password').isLength({min: 6,max: 8}).withMessage("Password must be of length 6 to 8")
], validate, register);

router.post('/login',[
    body('email').isEmail().withMessage("Enter valid Email"),
    body('password').isLength({min: 6,max: 8}).withMessage("Password must be of length 6 to 8")
], validate, login);

router.get('/me',auth, getUser);

export default router;
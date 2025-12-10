import express from "express";
import { getUser, login, register } from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
const router = express.Router();


router.post('/register', register);

router.post('/login', login);

router.get('/me',auth, getUser);

export default router;
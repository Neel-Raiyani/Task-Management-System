import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import {createWorkspace, addMember, myWorkSpaces} from "../controllers/workspaceController.js" 

router.post("/create-workspace", auth, createWorkspace);
router.post("/add-member", auth, addMember);
router.get("/my-workspaces", auth, myWorkSpaces);

export default router;
import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js"
import { addLabel, assignUser, createTask, deleteTask, getTask, listBoardTasks, moveTask, removeLabel, unassignUser, updateDueDate, updatePriority, updateTask } from "../controllers/taskController.js"

router.post('/create', auth, createTask);

router.get('/:taskId', auth, getTask);
router.get('/list-board-tasks/:boardId', auth, listBoardTasks);

router.put('/update/:taskId', auth, updateTask);
router.put('/move/:taskId', auth, moveTask);
router.put('/assign-user/:taskId',auth, assignUser);
router.put('/unassign-user/:taskId', auth, unassignUser);
router.put('/add-label/:taskId', auth, addLabel);
router.put('/remove-label/:taskId', auth, removeLabel);
router.put('/update-priority/:taskId', auth, updatePriority);
router.put('/update-due/:taskId', auth, updateDueDate);

router.delete('/delete/:taskId', auth, deleteTask);

export default router;


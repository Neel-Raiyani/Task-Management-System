import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js"
import { addLabel, assignUser, createTask, getTask, listBoardTasks, moveTask, removeLabel, unassignUser, updateDueDate, updatePriority, updateTask } from "../controllers/taskController.js"

router.post('/create', auth, createTask);

router.get('/:id', getTask);
router.get('/list-board-tasks/:boardId', auth, listBoardTasks);

router.put('/update/:taskId', updateTask);
router.put('/move/:taskId', moveTask);
router.put('/assign-user/:taskId',auth, assignUser);
router.put('/unassign-user/:taskId', auth, unassignUser);
router.put('/add-label/:taskId', addLabel);
router.put('/remove-label/:taskId', removeLabel);
router.put('/update-priority/:taskId', updatePriority);
router.put('/update-due/:taskId', updateDueDate);

export default router;


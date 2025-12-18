/**
 * @swagger
 * /task/create:
 *   post:
 *     summary: Create a new task
 *     description: Creates a task inside a column and board. Only workspace members can create tasks.
 *     tags:
 *       - [Task]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - boardId
 *               - columnId
 *               - title
 *             properties:
 *               boardId:
 *                 type: string
 *                 example: 64b1f7a23a9e1c00123abcd
 *               columnId:
 *                 type: string
 *                 example: 78a1f7a23a9e1c00999xyz
 *               title:
 *                 type: string
 *                 example: Fix login bug
 *               description:
 *                 type: string
 *                 example: Resolve authentication issue on login page
 *               priority:
 *                 type: string
 *                 example: High
 *               assigneeIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - 65d1f7a23a9e1c00456efgh
 *               labels:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - Bug
 *                   - Backend
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-01-30T00:00:00.000Z
 *
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task created
 *                 task:
 *                   type: object
 *
 *       400:
 *         description: Required fields missing
 *       403:
 *         description: You are not a member of this workspace
 *       404:
 *         description: Board or workspace not found
 *       409:
 *         description: Task with same title already exists in this column
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /task/{taskId}:
 *   get:
 *     summary: Get task details
 *     description: Fetches a single task by its ID.
 *     tags:
 *       - [Task]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the task
 *
 *     responses:
 *       200:
 *         description: Task fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *       400:
 *         description: Task ID is required
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /task/list-board-tasks/{boardId}:
 *   get:
 *     summary: List tasks of a board
 *     description: Fetches all tasks of a board in ascending order. Only workspace members can access.
 *     tags:
 *       - [Task]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the board
 *
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *
 *       400:
 *         description: User ID or Board ID missing
 *       403:
 *         description: You are not a member of this workspace
 *       404:
 *         description: Board or workspace not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /task/update/{taskId}:
 *   put:
 *     summary: Update task details
 *     description: Updates task fields. Only task creator or assignee can update.
 *     tags:
 *       - [Task]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the task
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *               assigneeIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               labels:
 *                 type: array
 *                 items:
 *                   type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task updated
 *                 task:
 *                   type: object
 *
 *       400:
 *         description: Task ID or User ID missing
 *       403:
 *         description: Not allowed to update this task
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /task/move/{taskId}:
 *   put:
 *     summary: Move task to another column
 *     description: Moves a task from one column to another.
 *     tags:
 *       - [Task]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the task
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newColumnId
 *             properties:
 *               newColumnId:
 *                 type: string
 *                 example: 78a1f7a23a9e1c00999xyz
 *
 *     responses:
 *       200:
 *         description: Task moved successfully
 *       400:
 *         description: Task ID is required
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /task/assign-user/{taskId}:
 *   put:
 *     summary: Assign user to task
 *     description: Assigns a user to an existing task.
 *     tags:
 *       - [Task]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 65d1f7a23a9e1c00456efgh
 *
 *     responses:
 *       200:
 *         description: User assigned successfully
 *       400:
 *         description: Task ID is required
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /task/unassign-user/{taskId}:
 *   put:
 *     summary: Unassign user from task
 *     description: Removes the authenticated user from task assignees.
 *     tags:
 *       - [Task]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: User unassigned successfully
 *       400:
 *         description: Task ID or User ID missing
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /task/add-label/{taskId}:
 *   put:
 *     summary: Add label to task
 *     description: Adds a label to a task.
 *     tags:
 *       - [Task]
 *     security:
 *       - bearerAuth: []
 * 
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - label
 *             properties:
 *               label:
 *                 type: string
 *                 example: Backend
 *
 *     responses:
 *       200:
 *         description: Label added successfully
 *       400:
 *         description: Task ID is required
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /task/remove-label/{taskId}:
 *   put:
 *     summary: Remove label from task
 *     description: Removes a specific label from a task.
 *     tags:
 *       - [Task]
 *     security:
 *       - bearerAuth: []
 * 
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - label
 *             properties:
 *               label:
 *                 type: string
 *                 example: Backend
 *
 *     responses:
 *       200:
 *         description: Label removed successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /task/update-priority/{taskId}:
 *   put:
 *     summary: Update task priority
 *     description: Updates the priority level of a task.
 *     tags:
 *       - [Task]
 *     security:
 *       - bearerAuth: []
 * 
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - priority
 *             properties:
 *               priority:
 *                 type: string
 *                 example: High
 *
 *     responses:
 *       200:
 *         description: Priority updated successfully
 *       400:
 *         description: Task ID is required
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /task/update-due/{taskId}:
 *   put:
 *     summary: Update task due date
 *     description: Updates the due date of a task.
 *     tags:
 *       - [Task]
 *     security:
 *       - bearerAuth: []
 * 
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - dueDate
 *             properties:
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-02-01T00:00:00.000Z
 *
 *     responses:
 *       200:
 *         description: Due date updated successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /task/delete/{taskId}:
 *   delete:
 *     summary: Delete a task
 *     description: Permanently deletes a task.
 *     tags:
 *       - [Task]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       400:
 *         description: Task ID is required
 *       500:
 *         description: Internal server error
 */

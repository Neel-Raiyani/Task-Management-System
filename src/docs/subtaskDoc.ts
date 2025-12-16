/**
 * @swagger
 * /subtask/create/{taskId}:
 *   post:
 *     summary: Create a subtask
 *     description: Creates a new subtask under a specific task.
 *     tags:
 *       - [Subtask]
 *
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the parent task
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Create API documentation
 *
 *     responses:
 *       201:
 *         description: Subtask created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Subtask created
 *                 subtask:
 *                   type: object
 *
 *       400:
 *         description: Task ID or title missing
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /subtask/toggle/{subtaskId}:
 *   put:
 *     summary: Toggle subtask status
 *     description: Marks a subtask as completed or incomplete.
 *     tags:
 *       - [Subtask]
 *
 *     parameters:
 *       - in: path
 *         name: subtaskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the subtask
 *
 *     responses:
 *       200:
 *         description: Subtask status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Subtask updated
 *                 subtask:
 *                   type: object
 *
 *       400:
 *         description: Subtask ID is required
 *       404:
 *         description: Subtask not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /subtask/delete/{subtaskId}:
 *   delete:
 *     summary: Delete a subtask
 *     description: Permanently deletes a subtask.
 *     tags:
 *       - [Subtask]
 *
 *     parameters:
 *       - in: path
 *         name: subtaskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the subtask
 *
 *     responses:
 *       200:
 *         description: Subtask deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Subtask deleted
 *
 *       400:
 *         description: Subtask ID is required
 *       404:
 *         description: Subtask not found
 *       500:
 *         description: Internal server error
 */

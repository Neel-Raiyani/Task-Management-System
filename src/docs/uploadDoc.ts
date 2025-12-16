/**
 * @swagger
 * /upload/task-files/{taskId}:
 *   put:
 *     summary: Upload files to a task
 *     description: Uploads up to 5 files and attaches them to a task.
 *     tags:
 *       - [Upload]
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *
 *     responses:
 *       201:
 *         description: Files uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Files uploaded
 *                 task:
 *                   type: object
 *
 *       400:
 *         description: Task ID missing or no files uploaded
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /upload/comment-files/{commentId}:
 *   put:
 *     summary: Upload files to a comment
 *     description: Uploads up to 5 files and attaches them to a comment.
 *     tags:
 *       - [Upload]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the comment
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *
 *     responses:
 *       201:
 *         description: Files uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Files uploaded
 *                 comment:
 *                   type: object
 *
 *       400:
 *         description: Comment ID missing or no files uploaded
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */

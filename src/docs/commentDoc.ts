/**
 * @swagger
 * /comment/add/{taskId}:
 *   post:
 *     summary: Add a comment to a task
 *     description: Adds a new comment to a task. Only authenticated users can comment.
 *     tags:
 *       - [Comment]
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
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: Please review this task once done.
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - https://example.com/image.png
 *
 *     responses:
 *       201:
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment added
 *                 comment:
 *                   type: object
 *
 *       400:
 *         description: User ID, Task ID, or content missing
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /comment/add-reply/{taskId}/{parentId}:
 *   post:
 *     summary: Add reply to a comment
 *     description: Adds a reply to an existing comment under the same task.
 *     tags:
 *       - [Comment]
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
 *       - in: path
 *         name: parentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the parent comment
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: I have completed this task.
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *
 *     responses:
 *       201:
 *         description: Reply added successfully
 *       400:
 *         description: Invalid request or mismatched task/comment
 *       404:
 *         description: Parent comment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /comment/{taskId}:
 *   get:
 *     summary: Get comments for a task
 *     description: Fetches all comments and replies for a task in chronological order.
 *     tags:
 *       - [Comment]
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
 *         description: Comments fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *
 *       400:
 *         description: Task ID missing
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /comment/delete/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     description: Deletes a comment. Users can delete only their own comments.
 *     tags:
 *       - [Comment]
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
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       400:
 *         description: User ID or Comment ID missing
 *       403:
 *         description: Not allowed to delete this comment
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */

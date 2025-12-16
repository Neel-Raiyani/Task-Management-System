/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search tasks in a board
 *     description: Search tasks in a board using filters like title, priority, status, assignee, or label.
 *     tags:
 *       - [Search]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the board
 *       - in: query
 *         name: title
 *         required: false
 *         schema:
 *           type: string
 *         description: Search by task title (case-insensitive, partial match)
 *       - in: query
 *         name: priority
 *         required: false
 *         schema:
 *           type: string
 *           enum: [low, medium, high]
 *         description: Filter by task priority
 *       - in: query
 *         name: assigneeId
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter tasks assigned to a specific user
 *       - in: query
 *         name: label
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter tasks containing a specific label
 *
 *     responses:
 *       200:
 *         description: List of tasks matching the search criteria
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
 *         description: boardId is required
 *       500:
 *         description: Internal server error
 */

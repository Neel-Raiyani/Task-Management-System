/**
 * @swagger
 * /column/create-column:
 *   post:
 *     summary: Create a new column
 *     description: Adds a new column to a specific board. Column order is assigned automatically.
 *     tags:
 *       - [Column]
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
 *               - name
 *             properties:
 *               boardId:
 *                 type: string
 *                 example: 64b1f7a23a9e1c00123abcd
 *               name:
 *                 type: string
 *                 example: In Progress
 *
 *     responses:
 *       201:
 *         description: Column created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Column added
 *                 column:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     order:
 *                       type: number
 *                     boardId:
 *                       type: string
 *
 *       400:
 *         description: Board ID & column name required
 *       404:
 *         description: Board not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /column/rename-column/{columnId}:
 *   put:
 *     summary: Rename a column
 *     description: Updates the name of an existing column.
 *     tags:
 *       - [Column]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: columnId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the column
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Done
 *
 *     responses:
 *       200:
 *         description: Column renamed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Column renamed
 *                 column:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *
 *       400:
 *         description: Column ID required
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /column/reorder-column:
 *   put:
 *     summary: Reorder columns
 *     description: Updates the order of columns within a board.
 *     tags:
 *       - [Column]
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
 *               - orderedIds
 *             properties:
 *               boardId:
 *                 type: string
 *                 example: 64b1f7a23a9e1c00123abcd
 *               orderedIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - 78a1f7a23a9e1c00999xyz
 *                   - 78a1f7a23a9e1c00888abc
 *
 *     responses:
 *       200:
 *         description: Columns reordered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Columns reordered
 *
 *       400:
 *         description: Board ID and column IDs are required
 *       404:
 *         description: Board not found
 *       500:
 *         description: Internal server error
 */

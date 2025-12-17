/**
 * @swagger
 * /workspace/create-board:
 *   post:
 *     summary: Create a New Board
 *     tags: [Board]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - workspaceId
 *             properties:
 *               title:
 *                 type: string
 *               workspaceId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Board created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Board created 
 *                 workspace:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     workspaceId:
 *                       type: string
 *       400:
 *         description: Title & Workspace ID required
 *       403:
 *         description: You are not a member of this workspace
 *       404:
 *         description:  Resource not found.
 *         Possible reasons:
 *            - User ID missing
 *            - Workspace not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /workspace/workspace-boards/{workspaceId}:
 *   get:
 *     summary: Get all boards of a workspace
 *     description: Fetches all boards belonging to a specific workspace along with their columns.
 *     tags: [Board]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: workspaceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the workspace
 *
 *     responses:
 *       200:
 *         description: Boards fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 boards:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 65c1f7a23a9e1c00456efgh
 *                       title:
 *                         type: string
 *                         example: Development Board
 *                       workspaceId:
 *                         type: string
 *                         example: 64b1f7a23a9e1c00123abcd
 *                       columns:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: 78a1f7a23a9e1c00999xyz
 *                             name:
 *                               type: string
 *                               example: To Do
 *
 *       404:
 *         description: Workspace ID is missing or workspace not found
 *
 *       500:
 *         description: Internal server error
 */

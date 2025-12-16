/**
 * @swagger
 * /workspace/create-workspace:
 *   post:
 *     summary: Create a New Workspace
 *     tags: [Workspace]
 *     security:
 *       - bearerAuth: []
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
 *                 example: Development Team
 *     responses:
 *       201:
 *         description: Workspace created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Workspace created successfully
 *                 workspace:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     ownerId:
 *                       type: string
 *                     memberIds:
 *                       type: array
 *                       items:
 *                         type: string
 *                     createdAt:
 *                       type: string
 *       400:
 *         description: Workspace name is required
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /workspace/add-member:
 *   post:
 *     summary: Add Member To Workspace
 *     tags: [Workspace]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - workspaceId
 *               - memberId
 *             properties:
 *               workspaceId:
 *                 type: string
 *               memberId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Member added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Member added successfully
 *                 workspace:
 *                   type: object
 *                   properties:
 *                     memberIds:
 *                       type: array
 *                       items:
 *                         type: string
 *       400:
 *         description: Only owner can add member
 *       404:
 *         description:  Resource not found.
 *         Possible reasons:
 *            - User ID missing
 *            - Workspace not found
 *       409:
 *         description: User already exists!!!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /workspace/my-workspaces:
 *   get:
 *     summary: Retrieve list of the user's workspaces
 *     tags: [Workspace]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved list of user's workspaces
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "64f1a2b3"
 *                   name:
 *                     type: string
 *                     example: "Development Team"
 *       404:
 *         description: User ID missing
 *       500:
 *         description: Internal server error
 */

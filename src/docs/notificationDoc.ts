/**
 * @swagger
 * /notification:
 *   get:
 *     summary: Get my notifications
 *     description: Fetch all notifications for the logged-in user, ordered by latest first.
 *     tags:
 *       - [Notification]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: List of user notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   message:
 *                     type: string
 *                   isRead:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *
 *       400:
 *         description: UserId missing
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /notification/mark-as-read/{notificationId}:
 *   put:
 *     summary: Mark a notification as read
 *     description: Marks a specific notification as read for the logged-in user.
 *     tags:
 *       - [Notification]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the notification
 *
 *     responses:
 *       200:
 *         description: Notification marked as read
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Notification marked as read
 *
 *       400:
 *         description: NotificationId missing
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 */

const express = require('express');
const groupController = require('../controllers/groupController');
const router = express.Router();

/**
 * @swagger
 * /api/groups:
 *   post:
 *     summary: Create a new group
 *     tags:
 *       - Groups
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "groupiii"
 *               description:
 *                 type: string
 *                 example: "Group Desc"
 *               assignedTo:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [3, 2]
 *     responses:
 *       201:
 *         description: Group created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Group created successfully"
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.post('/', groupController.createGroup);

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Retrieve a list of all groups
 *     tags:
 *       - Groups
 *     responses:
 *       200:
 *         description: A list of groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "group name"
 *                   description:
 *                     type: string
 *                     example: "description du groupe"
 *                   nbUsers:
 *                     type: integer
 *                     example: 2
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.get('/', groupController.getAllGroups);

router.get('/:id', groupController.getGroupById);

router.put('/:id', groupController.updateGroup);

router.delete('/:id', groupController.deleteGroup);

router.post('/leave', groupController.leaveGroup);


module.exports = router;
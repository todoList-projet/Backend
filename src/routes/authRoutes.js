const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * paths:
 *   /auth/register:
 *     post:
 *       summary: User registration
 *       description: Registers a new user.
 *       tags:
 *         - Authentication
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 first_name:
 *                   type: string
 *                   example: "John"
 *                 last_name:
 *                   type: string
 *                   example: "Doe"
 *                 email:
 *                   type: string
 *                   example: "john.doe@example.com"
 *                 password:
 *                   type: string
 *                   example: "password123"
 *       responses:
 *         '201':
 *           description: User successfully registered
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   first_name:
 *                     type: string
 *                     example: "John"
 *                   last_name:
 *                     type: string
 *                     example: "Doe"
 *                   email:
 *                     type: string
 *                     example: "john.doe@example.com"
 *         '400':
 *           description: Bad request
 *         '500':
 *           description: Internal server error
 */
router.post('/register', authController.register);

/**
 * @swagger
 * paths:
 *   /auth/login:
 *     post:
 *       summary: User login
 *       description: Authenticates a user and returns a JWT token.
 *       tags:
 *         - Authentication
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: "test1@dauphine.eu"
 *                 password:
 *                   type: string
 *                   example: "123456"
 *       responses:
 *         '200':
 *           description: Successful login
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   token:
 *                     type: string
 *                     example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         '401':
 *           description: Invalid credentials
 *         '500':
 *           description: Internal server error
*/
router.post('/login', authController.login);

module.exports = router;
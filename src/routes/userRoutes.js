const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const authenticateJWT = require("../utils/authMidlleware");




router.get('/', authenticateJWT,  userController.getAllUsersExceptCurrent);
router.put('/', authenticateJWT, userController.updateUser);
router.get('/me', authenticateJWT, userController.getUserById);
//unused
router.post('/', authenticateJWT, userController.createUser);
router.delete('/:id', authenticateJWT, userController.deleteUser);

module.exports = router;
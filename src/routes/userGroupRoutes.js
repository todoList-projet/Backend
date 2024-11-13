const express = require('express');
const router = express.Router();
const UserGroupController = require('../controllers/UserGroupController');

router.post('/:userId/:groupId', UserGroupController.assignUserToGroup);

module.exports = router;
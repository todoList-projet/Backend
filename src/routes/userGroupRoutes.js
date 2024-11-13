const express = require('express');
const router = express.Router();
const UserGroupController = require('../controllers/UserGroupController');

router.post('/:userId/:groupId', UserGroupController.assignUserToGroup);
router.get('/:userId', UserGroupController.getUserGroups);

module.exports = router;
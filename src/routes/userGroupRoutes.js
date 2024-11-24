const express = require('express');
const router = express.Router();
const UserGroupController = require('../controllers/UserGroupController');

router.post('/:userId/:groupId', UserGroupController.assignUserToGroup);
router.get('/user/:userId', UserGroupController.getUserGroups);
router.get('/group/:groupId', UserGroupController.getGroupUsers);

module.exports = router;
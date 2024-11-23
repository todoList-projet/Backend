const express = require('express');
const groupController = require('../controllers/groupController');
const router = express.Router();

router.post('/', groupController.createGroup);

router.get('/', groupController.getAllGroups);

router.get('/:id', groupController.getGroupById);

router.put('/:id', groupController.updateGroup);

router.delete('/:id', groupController.deleteGroup);

router.post('/leave', groupController.leaveGroupController);


module.exports = router;
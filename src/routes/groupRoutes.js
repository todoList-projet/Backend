const express = require('express');
const groupController = require('../controllers/groupController');
const authenticateJWT = require('../utils/authMidlleware');
const router = express.Router();


router.post('/', authenticateJWT, groupController.createGroup);
router.get('/', authenticateJWT, groupController.getAllGroups);
router.put('/:id', authenticateJWT, groupController.updateGroup);
router.post('/:id/leave',authenticateJWT, groupController.leaveGroup);
router.get('/:id/members', authenticateJWT, groupController.getMembersGroup);

//unused
router.get('/:id', authenticateJWT, groupController.getGroupById);
router.delete('/:id', authenticateJWT, groupController.deleteGroup);


module.exports = router;
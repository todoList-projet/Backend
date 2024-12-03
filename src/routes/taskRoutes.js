const express = require('express');
const taskController = require('../controllers/taskController');
const authenticateJWT = require("../utils/authMidlleware");
const router = express.Router();


router.post('/', authenticateJWT, taskController.createTask);
router.get('/', authenticateJWT, taskController.getAllTasks);
router.get('/personal', authenticateJWT, taskController.getPersonalTasks);
router.get('/collaborative', authenticateJWT, taskController.getCollaborativeTasks);
router.get('/archived', authenticateJWT, taskController.getArchivedTasks);
router.get('/group/:groupId', authenticateJWT, taskController.getTasksByGroup);

router.put('/:id', authenticateJWT, taskController.updateTask);
router.put('/:taskId/update-status', authenticateJWT, taskController.updateTaskStatus);

router.delete('/:id', authenticateJWT, taskController.deleteTask);
router.put('/:taskId/archive', authenticateJWT, taskController.archiveTask);

//unused
router.get('/:id', authenticateJWT, taskController.getTaskById);
router.get('/all/all', taskController.getAllTask);


module.exports = router;
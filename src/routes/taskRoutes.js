const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

router.post('/', taskController.createTask);
router.get('/:userId', taskController.getAllTasks);
router.get('/:userId/personal', taskController.getPersonalTasks);
router.get('/:userId/collaborative', taskController.getCollaborativeTasks);
router.get('/:userId/archived', taskController.getArchivedTasks);
router.get('/:userId/:id', taskController.getTaskById);
router.put('/:userId/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.put('/update-status', taskController.updateTaskStatus);



module.exports = router;
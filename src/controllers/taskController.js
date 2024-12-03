const taskService = require('../services/taskService');
const { CustomError } = require('../utils/errors');

const createTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const task = await taskService.createTask(req.body, userId);
        res.status(201).json(task);
    } catch (err) {
        if (err instanceof CustomError) {
            res.status(err.statusCode).json({ error: err.message });
        } else {
            console.error(err.stack);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
};

const getAllTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await taskService.getAllTasks(userId);
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};

const getPersonalTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await taskService.getPersonalTasks(userId);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCollaborativeTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await taskService.getCollaborativeTasks(userId);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getArchivedTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await taskService.getArchivedTasks(userId);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}



const updateTask = async (req, res) => {
    try {
        const updatedTask = await taskService.updateTask(req.params.id, req.body);
        res.status(200).json(updatedTask);
    } catch (err) {
        if (err instanceof CustomError) {
            res.status(err.statusCode).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
};

const deleteTask = async (req, res) => {
    try {
        const result = await taskService.deleteTask(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        if (err instanceof CustomError) {
            res.status(err.statusCode).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
};

const updateTaskStatus = async (req, res) => {
    try {
        const { statusId } = req.body;
        const { taskId } = req.params;
        console.log('task id', taskId);
        console.log('status id', statusId);
        if (!taskId || !statusId) {
            throw new CustomError(400, 'Task ID and Status ID are required');
        }

        const result = await taskService.updateTaskStatus(taskId, statusId);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

const archiveTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const result = await taskService.archiveTask(taskId);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

const getTasksByGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const result = await taskService.getTasksByGroup(groupId);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await taskService.getTaskById(req.params.id);
        res.status(200).json(task);
    } catch (err) {
        if (err instanceof CustomError) {
            res.status(err.statusCode).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
};

const getAllTask = async (req, res) => {
    try {
        const tasks = await taskService.getAllTask();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    createTask,
    getAllTasks,
    getPersonalTasks,
    getCollaborativeTasks,
    getArchivedTasks,
    updateTask,
    updateTaskStatus,
    deleteTask,
    archiveTask,
    getTaskById,
    getTasksByGroup,
    getAllTask
};
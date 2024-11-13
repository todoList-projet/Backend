const taskService = require('../services/taskService');
const { CustomError } = require('../utils/errors');

const createTask = async (req, res) => {
    try {
        const task = await taskService.createTask(req.body);
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
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'An unexpected error occurred' });
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

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
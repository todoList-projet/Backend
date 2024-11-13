const Task = require('../models/Task');
const { CustomError } = require('../utils/errors');
const { ModelSuccessMessage } = require('../utils/success');

const createTask = async (taskData) => {
    await Task.create(taskData);
    return new ModelSuccessMessage('Task', taskData.title, 'created');
};

const getAllTasks = async () => {
    return await Task.findAll();
};

const getTaskById = async (id) => {
    const task = await Task.findByPk(id);
    if (!task) {
        throw new CustomError(404, 'Task not found');
    }
    return task;
};

const updateTask = async (id, taskData) => {
    const task = await Task.findByPk(id);
    if (!task) {
        throw new CustomError(404, 'Task not found');
    }

    await task.update(taskData);
    return new ModelSuccessMessage('Task', taskData.title, 'updated');
};

const deleteTask = async (id) => {
    const task = await Task.findByPk(id);
    if (!task) {
        throw new CustomError(404, 'Task not found');
    }

    await task.destroy();
    return new ModelSuccessMessage('Task', task.title, 'deleted');
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
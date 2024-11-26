const Task = require('../models/Task');
const Group = require('../models/Group');
const User = require('../models/User');
const TypeTask = require("../models/TypeTask");
const StatusTask = require("../models/StatusTask");
const { CustomError } = require('../utils/errors');
const { ModelSuccessMessage } = require('../utils/success');


const createTask = async (taskData) => {
    const { type_task_id, group_ids, id_user, ...rest } = taskData;

    // Create the task with statusTaskId set to 1 by default
    const task = await Task.create({
        ...rest,
        typeTaskId: type_task_id,
        statusTaskId: 1,
    });

    console.log('task', task);

    if (type_task_id === 2 && group_ids && group_ids.length > 0) {
        // If the task is collaborative, add references to the task_group table
        const groups = await Group.findAll({
            where: {
                id: group_ids
            }
        });

        if (groups.length !== group_ids.length) {
            throw new CustomError(400, 'Some groups not found');
        }

        await task.addGroups(groups);
    } else if (type_task_id === 1 && id_user) {
        // If the task is personal, associate it with the user
        const user = await User.findByPk(id_user);
        if (!user) {
            throw new CustomError(404, 'User not found');
        }
        await task.addUser(user);
    } else {
        throw new CustomError(400, 'Invalid task type or missing required data');
    }

    // Add reference to the task_user table in both cases
    if (id_user) {
        const user = await User.findByPk(id_user);
        if (!user) {
            throw new CustomError(404, 'User not found');
        }
        await task.addUser(user);
    }

    return new ModelSuccessMessage('Task', task.title, 'created');
};

const getAllTasks = async (userId) => {
    return await Task.findAll({
        where: {
            archived: 0
        },
        include: [{
            model: User,
            as: 'users',
            where: { id: userId },
            attributes: ['id', 'first_name', 'last_name'],
            through: { attributes: [] }

        },
        {
            model: TypeTask,
            as: 'type',
            attributes: ['id', 'name']
        },
        {
            model: StatusTask,
            as: 'status',
            attributes: ['id', 'name']
        },
        {
            model: Group,
            as: 'groups',
            attributes: ['id', 'name'],
            through: { attributes: [] }
        }

        ]
    });
};

const getPersonalTasks = async (userId) => {
    return await Task.findAll({
        where: {
            typeTaskId: 1,
            archived: 0
        },
        include: [{
            model: User,
            as: 'users',
            where: { id: userId },
            attributes: ['id', 'first_name', 'last_name']   ,
            through: { attributes: [] }
        },
        {
            model: TypeTask,
            as: 'type',
            attributes: ['id', 'name']
        },
        {
            model: StatusTask,
            as: 'status',
            attributes: ['id', 'name']
        },
        {
            model: Group,
            as: 'groups',
            attributes: ['id', 'name'],
            through: { attributes: [] }
        }
        ]
    });
};

const getCollaborativeTasks = async (userId) => {
    return await Task.findAll({
        where: {
            typeTaskId: 2,
            archived: 0
        },
        include: [{
            model: User,
            as: 'users',
            where: { id: userId },
            attributes: ['id', 'first_name', 'last_name'],
            through: { attributes: [] }

        },
        {
            model: TypeTask,
            as: 'type',
            attributes: ['id', 'name']
        },
        {
            model: StatusTask,
            as: 'status',
            attributes: ['id', 'name']
        },
        {
            model: Group,
            as: 'groups',
            attributes: ['id', 'name'],
            through: { attributes: [] }
        }]
    });
};

const getArchivedTasks = async (userId) => {
    return await Task.findAll({
        where: {
            archived: 1
        },
        include: [{
            model: User,
            as: 'users',
            where: { id: userId },
            attributes: ['id', 'first_name', 'last_name'],
            through: { attributes: [] }
        },
        {
            model: TypeTask,
            as: 'type',
            attributes: ['id', 'name']
        },
        {
            model: StatusTask,
            as: 'status',
            attributes: ['id', 'name']
        },
        {
            model: Group,
            as: 'groups',
            attributes: ['id', 'name'],
            through: { attributes: [] }
        }]
    });
}

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
const updateTaskStatus = async (taskId, statusId) => {
    const validStatusIds = [1, 2, 3, 4];
    if (!validStatusIds.includes(statusId)) {
        throw new CustomError(400, 'Invalid status ID');
    }

    const task = await Task.findByPk(taskId);
    if (!task) {
        throw new CustomError(404, 'Task not found');
    }

    await task.update({ statusTaskId: statusId });
    return new ModelSuccessMessage('Task', task.title, 'status updated');
};



module.exports = {
    createTask,
    getAllTasks,
    getPersonalTasks,
    getCollaborativeTasks,
    getTaskById,
    updateTask,
    deleteTask,
    updateTaskStatus,
    getArchivedTasks
};
const Task = require('../models/Task');
const Group = require('../models/Group');
const User = require('../models/User');
const TypeTask = require("../models/TypeTask");
const StatusTask = require("../models/StatusTask");
const { CustomError } = require('../utils/errors');
const { ModelSuccessMessage } = require('../utils/success');
const sequelize = require('../config/db');

const createTask = async (taskData, userId) => {
    const {typeTaskId, groupIds, ...rest} = taskData;

    // Create the task with statusTaskId set to 1 by default
    const task = await Task.create({
        ...rest,
        typeTaskId,
        statusTaskId: 1,
    });

    if (typeTaskId === 2 && groupIds && groupIds.length > 0) {
        // If the task is collaborative, add references to the task_group table
        const groups = await Group.findAll({
            where: {
                id: groupIds
            }
        });

        if (groups.length !== groupIds.length) {
            throw new CustomError(400, 'Some groups not found');
        }

        await task.addGroups(groups);
    } else if (typeTaskId === 1) {
        // If the task is personal, associate it with the user
        const user = await User.findByPk(userId);
        if (!user) {
            throw new CustomError(404, 'User not found');
        }
        await task.addUser(user);
    } else {
        throw new CustomError(400, 'Invalid task type or missing required data');
    }
    return new ModelSuccessMessage('Task', task.title, 'created');

};
const getAllTasks = async (userId) => {
    const query = `
        SELECT DISTINCT 
            t.id, 
            t.title, 
            t.category, 
            t.description, 
            t.deadline, 
            t.creation_date,
            tt.id AS type_id, 
            tt.name AS type_name,
            st.id AS status_id, 
            st.name AS status_name,
            g.id AS group_id, 
            g.name AS group_name
        FROM tasks t
        LEFT JOIN type_tasks tt ON t.type_task_id = tt.id
        LEFT JOIN status_tasks st ON t.status_task_id = st.id
        LEFT JOIN task_user tu ON t.id = tu.task_id
        LEFT JOIN task_group tg ON t.id = tg.task_id
        LEFT JOIN \`groups\` g ON tg.group_id = g.id
        LEFT JOIN group_user gu ON g.id = gu.group_id
        WHERE t.archived = 0 AND (tu.user_id = :userId OR gu.user_id = :userId);
    `;

    const tasks = await sequelize.query(query, {
        replacements: { userId },
        type: sequelize.QueryTypes.SELECT
    });

    return tasks.map(task => ({
        id: task.id,
        title: task.title,
        category: task.category,
        description: task.description,
        deadline: task.deadline,
        creation_date: task.creation_date,
        type: {
            id: task.type_id,
            name: task.type_name
        },
        status: {
            id: task.status_id,
            name: task.status_name
        },
        group: {
            id: task.group_id,
            name: task.group_name
        }
    }));
};

const getPersonalTasks = async (userId) => {
    const query = `
        SELECT DISTINCT 
            t.id, 
            t.title, 
            t.category, 
            t.description, 
            t.deadline, 
            t.creation_date,
            tt.id AS type_id, 
            tt.name AS type_name,
            st.id AS status_id, 
            st.name AS status_name
        FROM tasks t
        LEFT JOIN type_tasks tt ON t.type_task_id = tt.id
        LEFT JOIN status_tasks st ON t.status_task_id = st.id
        LEFT JOIN task_user tu ON t.id = tu.task_id
        WHERE t.archived = 0 AND t.type_task_id = 1 AND tu.user_id = :userId;
    `;

    const tasks = await sequelize.query(query, {
        replacements: { userId },
        type: sequelize.QueryTypes.SELECT
    });

    return tasks.map(task => ({
        id: task.id,
        title: task.title,
        category: task.category,
        description: task.description,
        deadline: task.deadline,
        creation_date: task.creation_date,
        type: {
            id: task.type_id,
            name: task.type_name
        },
        status: {
            id: task.status_id,
            name: task.status_name
        }
    }));
};

const getCollaborativeTasks = async (userId) => {
    const query = `
        SELECT DISTINCT 
            t.id, 
            t.title, 
            t.category, 
            t.description, 
            t.deadline, 
            t.creation_date,
            tt.id AS type_id, 
            tt.name AS type_name,
            st.id AS status_id, 
            st.name AS status_name,
            g.id AS group_id, 
            g.name AS group_name
        FROM tasks t
        LEFT JOIN type_tasks tt ON t.type_task_id = tt.id
        LEFT JOIN status_tasks st ON t.status_task_id = st.id
        LEFT JOIN task_user tu ON t.id = tu.task_id
        LEFT JOIN task_group tg ON t.id = tg.task_id
        LEFT JOIN \`groups\` g ON tg.group_id = g.id
        LEFT JOIN group_user gu ON g.id = gu.group_id
        WHERE t.archived = 0 AND t.type_task_id = 2 AND (tu.user_id = :userId OR gu.user_id = :userId);
    `;

    const tasks = await sequelize.query(query, {
        replacements: { userId },
        type: sequelize.QueryTypes.SELECT
    });

    return tasks.map(task => ({
        id: task.id,
        title: task.title,
        category: task.category,
        description: task.description,
        deadline: task.deadline,
        creation_date: task.creation_date,
        type: {
            id: task.type_id,
            name: task.type_name
        },
        status: {
            id: task.status_id,
            name: task.status_name
        },
        group: {
            id: task.group_id,
            name: task.group_name
        }
    }));
};

const getArchivedTasks = async (userId) => {
    const query = `
        SELECT DISTINCT
            t.id,
            t.title,
            t.category,
            t.description,
            t.deadline,
            t.creation_date,
            tt.id AS type_id,
            tt.name AS type_name,
            st.id AS status_id,
            st.name AS status_name,
            g.id AS group_id,
            g.name AS group_name
        FROM tasks t
        LEFT JOIN type_tasks tt ON t.type_task_id = tt.id
        LEFT JOIN status_tasks st ON t.status_task_id = st.id
        LEFT JOIN task_user tu ON t.id = tu.task_id
        LEFT JOIN task_group tg ON t.id = tg.task_id
        LEFT JOIN \`groups\` g ON tg.group_id = g.id
        LEFT JOIN group_user gu ON g.id = gu.group_id
        WHERE t.archived = 1 AND (tu.user_id = :userId OR gu.user_id = :userId);
    `;

    const tasks = await sequelize.query(query, {
        replacements: { userId },
        type: sequelize.QueryTypes.SELECT
    });

    return tasks.map(task => ({
        id: task.id,
        title: task.title,
        category: task.category,
        description: task.description,
        deadline: task.deadline,
        creation_date: task.creation_date,
        type: {
            id: task.type_id,
            name: task.type_name
        },
        status: {
            id: task.status_id,
            name: task.status_name
        },
        group: {
            id: task.group_id,
            name: task.group_name
        }
    }));
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

const archiveTask = async (taskId) => {
    const task = await Task.findByPk(taskId);
    if (!task) {
        throw new CustomError(404, 'Task not found');
    }

    await task.update({ archived: true });
    return new ModelSuccessMessage('Task', task.title, 'archived');
};

module.exports = {
    createTask,
    getAllTasks,
    getPersonalTasks,
    getCollaborativeTasks,
    getArchivedTasks,

    updateTask,
    deleteTask,
    updateTaskStatus,
    archiveTask,
    getTaskById,

};
const { Group, Task } = require('../models');
const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');


const getGroupTasks = async (groupId) => {
    try {
        const group = await Group.findByPk(groupId);

        if (!group) {
            throw new Error('Group not found');
        }

        const tasks = await group.getTasks({
            attributes: ['id', 'title', 'description', 'status'],
            joinTableAttributes: []
        });
        return tasks;
    } catch (error) {
        console.error('Error getting group tasks:', error);
        throw error;
    }
};

module.exports = {
    getGroupTasks
};
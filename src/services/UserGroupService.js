const { Group, User } = require('../models');
const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');


const assignUserToGroup = async (userId, groupId) => {

    try {
        const user = await User.findByPk(userId);
        const group = await Group.findByPk(groupId);


        if (!user || !group) {
            throw new Error('User or Group not found');
        }

        // Check if the user is already in the group
        const existingAssignment = await sequelize.query(
            'SELECT * FROM `Group_User` WHERE `user_id` = :userId AND `group_id` = :groupId',
            {
                replacements: { userId, groupId },
                type: QueryTypes.SELECT
            }
        );

        if (existingAssignment.length > 0) {
            return { message: 'User is already assigned to this group' };
        }

        // Assign user to group
        await user.addGroup(group);

        return { message: 'User assigned to group successfully' };
    } catch (error) {
        console.error('Error assigning user to group:', error);
        throw error;
    }
};

//get user groups
const getUserGroups = async (userId) => {
    try {
        const user = await User.findByPk(userId);

        if (!user) {
            throw new Error('User not found');
        }

        const groups = await user.getGroups({
            attributes: ['id', 'name', 'description','nb_users'],
            joinTableAttributes: []
        });
        return groups;
    } catch (error) {
        console.error('Error getting user groups:', error);
        throw error;
    }
};

//get group users
const getGroupUsers = async (groupId) => {
    try {
        const group = await Group.findByPk(groupId);

        if (!group) {
            throw new Error('Group not found');
        }

        const users = await group.getUsers({
            attributes: ['id', 'first_name', 'last_name'],
            joinTableAttributes: []
        });
        return users;
    } catch (error) {
        console.error('Error getting group users:', error);
        throw error;
    }
};

module.exports = {
    assignUserToGroup,
    getUserGroups,
    getGroupUsers
};
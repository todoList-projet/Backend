const { Group, User,Task } = require('../models');
const sequelize = require('../config/db');
const { CustomError, AlreadyExistError } = require('../utils/errors');
const { ModelSuccessMessage } = require('../utils/success');
const { QueryTypes, Op} = require('sequelize');


const createGroup = async (groupData) => {
    const { name, description, assignedTo: userIds } = groupData;
    const existingGroup = await Group.findOne({ where: { name } });
    if (existingGroup) {
        throw new AlreadyExistError('Group with this name');
    }

    const group = await Group.create({ name, description });

    let userCount = 0;

    // Assign other users to the group
    for (const id of userIds) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                console.error(`User with ID ${id} not found`);
                continue;
            }

            // Check if the user is already in the group
            const existingAssignment = await sequelize.query(
                'SELECT * FROM `Group_User` WHERE `user_id` = :userId AND `group_id` = :groupId',
                {
                    replacements: { userId: id, groupId: group.id },
                    type: QueryTypes.SELECT
                }
            );

            if (existingAssignment.length === 0) {
                // Assign user to group
                await user.addGroup(group);
                userCount++;
            }
        } catch (error) {
            console.error(`Error assigning user with ID ${id} to group:`, error);
        }
    }

    // Update the nb_users field in the group
    await group.update({ nbUsers: userCount });

    return new ModelSuccessMessage('Group', name, 'created');
};

const getAllGroups = async (userId) => {
    try {
        return await Group.findAll({
            include: [{
                model: User,
                as: 'users',
                where: { id: userId },
                attributes: [],
                through: { attributes: [] }
            },],
            attributes: ['id', 'name', 'description', 'nbUsers'],

        });
    } catch (error) {
        console.error('Error fetching groups:', error);
        throw new CustomError(500, 'An unexpected error occurred');
    }
};

const updateGroup = async (id, groupData, userId) => {
    const { name, description, assignedTo: userIds } = groupData;
    const group = await Group.findByPk(id);
    if (!group) {
        throw new CustomError(404, 'Group not found');
    }

    if (name) {
        const existingGroup = await Group.findOne({
            where: { name, id: { [Op.ne]: id } }
        });
        if (existingGroup) {
            throw new AlreadyExistError('Group with this name');
        }
    }

    await group.update({ name, description });


    // Remove all current users from the group except the user making the request
    const currentUsers = await group.getUsers();
    for (const user of currentUsers) {
        if (user.id !== userId) {
            await user.removeGroup(group);
        }
    }

    // Ensure the user making the request is always in the group
    if (!userIds.includes(userId)) {
        userIds.push(userId);
    }

    // Assign new users to the group
    for (const id of userIds) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                console.error(`User with ID ${id} not found`);
                continue;
            }

            // Check if the user is already in the group
            const existingAssignment = await sequelize.query(
                'SELECT * FROM `Group_User` WHERE `user_id` = :userId AND `group_id` = :groupId',
                {
                    replacements: { userId: id, groupId: group.id },
                    type: QueryTypes.SELECT
                }
            );

            if (existingAssignment.length === 0) {
                // Assign user to group
                await user.addGroup(group);
            }
        } catch (error) {
            console.error(`Error assigning user with ID ${id} to group:`, error);
        }
    }
    // Count the number of users in the group
    const userCount = await group.countUsers();

    // Update the nb_users field in the group
    await group.update({ nbUsers: userCount });

    return new ModelSuccessMessage('Group', name, 'updated');
};

const leaveGroup = async (userId, groupId) => {
    const group = await Group.findByPk(groupId);
    if (!group) {
        throw new CustomError(404, 'Group not found');
    }

    const user = await User.findByPk(userId);
    if (!user) {
        throw new CustomError(404, 'User not found');
    }

    // Check if the user is in the group
    const existingAssignment = await sequelize.query(
        'SELECT * FROM `Group_User` WHERE `user_id` = :userId AND `group_id` = :groupId',
        {
            replacements: { userId, groupId },
            type: QueryTypes.SELECT
        }
    );

    if (existingAssignment.length === 0) {
        throw new CustomError(400, 'User is not a member of this group');
    }

    // Remove user from group
    await user.removeGroup(group);

    // Check the number of users left in the group
    const remainingUsers = await group.countUsers();
    if (remainingUsers === 0) {
        await group.destroy();
        return new ModelSuccessMessage('Group', group.name, 'deleted because it had no members left');
    }

    return new ModelSuccessMessage('User', userId, 'left the group successfully');
};

const getMembersGroup = async (groupId) => {
    const group = await Group.findByPk(groupId);
    if (!group) {
        throw new CustomError(404, 'Group not found');
    }

    return await group.getUsers({
        attributes: ['id', 'first_name', 'last_name'],
        joinTableAttributes: []
    });
};



//not using
const getGroupById = async (id) => {
    const group = await Group.findByPk(id);
    if (!group) {
        throw new CustomError(404, 'Group not found');
    }
    return group;
};
const deleteGroup = async (id) => {
    const group = await Group.findByPk(id);
    if (!group) {
        throw new CustomError(404, 'Group not found');
    }

    await group.destroy();
    return new ModelSuccessMessage('Group', group.name, 'deleted');
};
module.exports = {
    createGroup,
    getAllGroups,
    getGroupById,
    updateGroup,
    deleteGroup,
    leaveGroup,
    getMembersGroup

};
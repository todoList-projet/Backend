const { Group, User } = require('../models');
const sequelize = require('../config/db');
const { CustomError, AlreadyExistError } = require('../utils/errors');
const { ModelSuccessMessage } = require('../utils/success');
const { QueryTypes, Op} = require('sequelize');

// const createGroup = async (groupData) => {
//     const existingGroup = await Group.findOne({ where: { name: groupData.name } });
//     if (existingGroup) {
//         throw new AlreadyExistError('Group with this name');
//     }
//     await Group.create(groupData);
//     return new ModelSuccessMessage('Group', groupData.name, 'created');
// };
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


const getAllGroups = async () => {
    return await Group.findAll();
};

const getGroupById = async (id) => {
    const group = await Group.findByPk(id);
    if (!group) {
        throw new CustomError(404, 'Group not found');
    }
    return group;
};

// const updateGroup = async (id, groupData) => {
//     const group = await Group.findByPk(id);
//     if (!group) {
//         throw new CustomError(404, 'Group not found');
//     }
//
//     if (groupData.name) {
//         const existingGroup = await Group.findOne({
//             where: { name: groupData.name, id: { [Op.ne]: id } }
//         });
//         if (existingGroup) {
//             throw new AlreadyExistError('Group with this name');
//         }
//     }
//
//     await group.update(groupData);
//     return new ModelSuccessMessage('Group', groupData.name, 'updated');
// };

const updateGroup = async (id, groupData) => {
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

    let userCount = 0;

    // Remove all current users from the group
    const currentUsers = await group.getUsers();
    for (const user of currentUsers) {
        await user.removeGroup(group);
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
                userCount++;
            }
        } catch (error) {
            console.error(`Error assigning user with ID ${id} to group:`, error);
        }
    }

    // Update the nb_users field in the group
    await group.update({ nbUsers: userCount });

    return new ModelSuccessMessage('Group', name, 'updated');
};

const deleteGroup = async (id) => {
    const group = await Group.findByPk(id);
    if (!group) {
        throw new CustomError(404, 'Group not found');
    }

    await group.destroy();
    return new ModelSuccessMessage('Group', group.name, 'deleted');
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

module.exports = {
    createGroup,
    getAllGroups,
    getGroupById,
    updateGroup,
    deleteGroup,
    leaveGroup,
};
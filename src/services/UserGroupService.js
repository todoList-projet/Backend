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
            'SELECT * FROM `User_Group` WHERE `user_id` = :userId AND `group_id` = :groupId',
            {
                replacements: { userId, groupId },
                type: QueryTypes.SELECT
            }
        );

        if (existingAssignment.length > 0) {
            return { message: 'User is already assigned to this group' };
        }

        // Assign user to group
        const query = 'INSERT INTO `User_Group` (`user_id`, `group_id`) VALUES (:userId, :groupId)';
        await sequelize.query(query, {
            replacements: { userId, groupId },
            type: QueryTypes.INSERT
        });
        return { message: 'User assigned to group successfully' };
    } catch (error) {
        console.error('Error assigning user to group:', error);
        throw error;
    }
};

module.exports = {
    assignUserToGroup
};
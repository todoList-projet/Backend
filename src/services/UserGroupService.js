const { Group, User } = require('../models');
const sequelize = require('../config/db');


const assignUserToGroup = async (userId, groupId) => {

    try {
        const user = await User.findByPk(userId);
        const group = await Group.findByPk(groupId);


        if (!user || !group) {
            throw new Error('User or Group not found');
        }

        const query = "INSERT INTO `User_Group` (`user_id`, `group_id`) VALUES (:userId, :groupId)";
        await sequelize.query(query, {
            replacements: { userId, groupId },
            type: sequelize.QueryTypes.INSERT
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
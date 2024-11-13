const UserGroupService = require('../services/UserGroupService');

const assignUserToGroup = async (req, res) => {
    const { userId, groupId } = req.params;

    try {
        const result = await UserGroupService.assignUserToGroup(userId, groupId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//get user groups
const getUserGroups = async (req, res) => {
    const { userId } = req.params;

    try {
        const groups = await UserGroupService.getUserGroups(userId);
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    assignUserToGroup,
    getUserGroups
};
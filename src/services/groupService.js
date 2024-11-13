const Group = require('../models/Group');
const { CustomError, AlreadyExistError } = require('../utils/errors');
const { ModelSuccessMessage } = require('../utils/success');
const { Op } = require('sequelize');

const createGroup = async (groupData) => {
    const existingGroup = await Group.findOne({ where: { name: groupData.name } });
    if (existingGroup) {
        throw new AlreadyExistError('Group with this name');
    }
    await Group.create(groupData);
    return new ModelSuccessMessage('Group', groupData.name, 'created');
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

const updateGroup = async (id, groupData) => {
    const group = await Group.findByPk(id);
    if (!group) {
        throw new CustomError(404, 'Group not found');
    }

    if (groupData.name) {
        const existingGroup = await Group.findOne({
            where: { name: groupData.name, id: { [Op.ne]: id } }
        });
        if (existingGroup) {
            throw new AlreadyExistError('Group with this name');
        }
    }

    await group.update(groupData);
    return new ModelSuccessMessage('Group', groupData.name, 'updated');
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
};
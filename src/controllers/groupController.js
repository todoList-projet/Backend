const groupService = require('../services/groupService');
const { CustomError } = require('../utils/errors');


const createGroup = async (req, res) => {
    try {
        const userId = req.user.id;
        const groupData = { ...req.body, assignedTo: [userId, ...req.body.assignedTo] };
        const group = await groupService.createGroup(groupData);
        res.status(201).json(group);
    } catch (err) {
        if (err instanceof CustomError) {
            res.status(err.statusCode).json({ error: err.message });
        } else {
            console.error(err.stack);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
};

const getAllGroups = async (req, res) => {
    try {
        const userId = req.user.id;
        const groups = await groupService.getAllGroups(userId);

        res.status(200).json(groups);
    } catch (err) {
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};

const updateGroup = async (req, res) => {
    try {
        const userId = req.user.id;
        const updatedGroup = await groupService.updateGroup(req.params.id, req.body, userId);
        res.status(200).json(updatedGroup);
    } catch (err) {
        if (err instanceof CustomError) {
            res.status(err.statusCode).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
};

const leaveGroup = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const result = await groupService.leaveGroup(userId, id);
        res.status(200).json(result);
    } catch (err) {
        if (err instanceof CustomError) {
            res.status(err.statusCode).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
};

const getMembersGroup = async (req, res) => {
    try {
        const members = await groupService.getMembersGroup(req.params.id);
        res.status(200).json(members);
    } catch (err) {
        if (err instanceof CustomError) {
            res.status(err.statusCode).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
};

//unused
const getGroupById = async (req, res) => {
    try {
        const group = await groupService.getGroupById(req.params.id);
        res.status(200).json(group);
    } catch (err) {
        if (err instanceof CustomError) {
            res.status(err.statusCode).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
};
const deleteGroup = async (req, res) => {
    try {
        const result = await groupService.deleteGroup(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        if (err instanceof CustomError) {
            res.status(err.statusCode).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
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
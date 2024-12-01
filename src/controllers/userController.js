const userService = require('../services/userService');
const { CustomError } = require('../utils/errors');

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        if (err instanceof CustomError) {
            res.status(err.statusCode).json({ error: err.message });
        } else {
            console.error(err.stack);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
};

const getAllUsersExceptCurrent = async (req, res) => {
    try {
        const userId = req.user.id;
        const users = await userService.getAllUsersExceptCurrent(userId);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
    } catch (err) {
        if (err instanceof CustomError) {
            res.status(err.statusCode).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from token
        const updatedUser = await userService.updateUser(userId, req.body);
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error(err); // Log the error details
        if (err instanceof CustomError) {
            res.status(err.statusCode).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
};

const deleteUser = async (req, res) => {
    try {
        const result = await userService.deleteUser(req.params.id);
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
    //getAllUsers,
    getAllUsersExceptCurrent,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};
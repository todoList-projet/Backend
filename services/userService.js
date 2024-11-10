const User = require('../models/User');

const getAllUsers = async () => {
    return await User.findAll();
};

const createUser = async (userData) => {
    return User.create(userData);
};

module.exports = {
    getAllUsers,
    createUser,
};
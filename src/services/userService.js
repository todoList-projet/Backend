const User = require('../models/User');
const { CustomError, AlreadyExistError } = require('../utils/errors');
const { ModelSuccessMessage } = require('../utils/success');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const createUser = async (userData) => {
    const existingUser = await User.findOne({ where: { email: userData.email } });
    if (existingUser) {
        throw new AlreadyExistError('User with this email');
    }
    await User.create(userData);
    return new ModelSuccessMessage('User', userData.first_name, 'created' );
};



const getAllUsersExceptCurrent = async (userId) => {
    return await User.findAll({
        where: {
            id: { [Op.ne]: userId }
        }
    });
};


const getUserById = async (id) => {
    const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] }
    });
    if (!user) {
        throw new CustomError(404, 'User not found');
    }
    return user;
};

const updateUser = async (id, userData) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new CustomError(404, 'User not found');
    }

    if (userData.email) {
        const existingUser = await User.findOne({
            where: { email: userData.email, id: { [Op.ne]: id } }
        });
        if (existingUser) {
            throw new AlreadyExistError('User with this email');
        }
    }

    if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
    }

    await user.update(userData);
    return new ModelSuccessMessage('User', userData.first_name, 'updated');
};

const deleteUser = async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new CustomError(404, 'User not found');
    }

    await user.destroy();
    return new ModelSuccessMessage('User',  user.first_name, 'deleted');
};

module.exports = {
    createUser,
   // getAllUsers,
    getAllUsersExceptCurrent,
    getUserById,
    updateUser,
    deleteUser,
};
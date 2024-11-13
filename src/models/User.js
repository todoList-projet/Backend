const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const Task = require('./Task');
const Group = require('./Group');

class User extends Model {}

User.init({
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
});

// Associations
User.belongsToMany(Task, { through: 'User_Task', as: 'tasks' });
User.belongsToMany(Group, { through: 'User_Group', as: 'groups' });

module.exports = User;

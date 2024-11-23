const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

class Group extends Model {}

Group.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description : {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nbUsers: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
}, {
    sequelize,
    modelName: 'Group',
    tableName: 'groups',
});

// Associations
Group.associate = (models) => {
    Group.belongsToMany(models.User, { through: 'Group_User', as: 'users' });
    Group.belongsToMany(models.Task, { through: 'Task_Group', as: 'tasks' });
};
module.exports = Group;

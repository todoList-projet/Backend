const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

class Group extends Model {}

Group.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
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
//Group.belongsToMany(User, { through: 'UserGroup', as: 'users' });

module.exports = Group;

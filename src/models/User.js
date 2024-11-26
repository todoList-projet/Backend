const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

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
        //unique: true,
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

User.associate = (models) => {
    User.belongsToMany(models.Group, { through: 'Group_User', as: 'groups' });
    User.belongsToMany(models.Task, { through: 'Task_User', as: 'tasks' });
};
module.exports = User;

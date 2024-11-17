// models/Task.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const TypeTask = require('./TypeTask');
const Status = require('./StatusTask');
const User = require("./User");

class Task extends Model {}

Task.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    creation_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
});
Task.associate = (models) => {
    Task.belongsTo(models.TypeTask, { foreignKey: 'typeTaskId', as: 'type' });
    Task.belongsTo(models.StatusTask, { foreignKey: 'statusTaskId', as: 'status' });
    Task.belongsToMany(models.User, { through: 'Task_User', as: 'users' });
    Task.belongsToMany(models.Group, { through: 'Task_Group', as: 'groups' });

}
// Associations
//Task.belongsTo(TypeTask, { foreignKey: 'typeTaskId', as: 'type' });
//Task.belongsTo(Status, { foreignKey: 'statusId', as: 'status' });
//Task.belongsToMany(User, { through: 'UserTask', as: 'users' });


module.exports = Task;
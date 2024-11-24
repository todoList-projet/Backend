const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const Task = require('./Task');

class StatusTask extends Model {}

StatusTask.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Status',
    tableName: 'status_tasks',
});

StatusTask.associate = (models) => {
    StatusTask.hasMany(models.Task, { foreignKey: 'statusTaskId', as: 'tasks' });
};
// Associations
//StatusTask.hasMany(Task, { foreignKey: 'statusId', as: 'tasks' });

module.exports = StatusTask;

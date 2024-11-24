const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const Task = require('./Task');

class TypeTask extends Model {}

TypeTask.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'TypeTask',
    tableName: 'type_tasks',
});

TypeTask.associate = (models) => {
    TypeTask.hasMany(models.Task, { foreignKey: 'typeTaskId', as: 'tasks' });
}

// Associations
//TypeTask.hasMany(Task, { foreignKey: 'typeTaskId', as: 'tasks' });

module.exports = TypeTask;

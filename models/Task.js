const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Status = require('./Status');
const TypeTask = require('./TypeTask');

const Task = sequelize.define('Task', {
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
    status_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Status,
            key: 'id',
        },
    },
    type_task_id: {
        type: DataTypes.INTEGER,
        references: {
            model: TypeTask,
            key: 'id',
        },
    },
});

Task.belongsTo(Status, { foreignKey: 'status_id' });
Task.belongsTo(TypeTask, { foreignKey: 'type_task_id' });

module.exports = Task;
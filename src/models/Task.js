// models/Task.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const moment = require('moment');


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
        get() {
            return moment(this.getDataValue('deadline')).format('DD/MM/YYYY HH:mm');
        }
    },
    creation_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        get() {
            return moment(this.getDataValue('creation_date')).format('DD/MM/YYYY HH:mm');
        }
    },
    typeTaskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    statusTaskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    archived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
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
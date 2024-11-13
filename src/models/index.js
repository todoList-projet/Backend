const sequelize = require('../config/db');
const User = require('./User');
const Task = require('./Task');
const TypeTask = require('./TypeTask');
const StatusTask = require('./StatusTask');
const Group = require('./Group');

// Configurer les associations après l'importation des modèles
User.belongsToMany(Task, { through: 'User_Task', as: 'tasks' });
User.belongsToMany(Group, { through: 'User_Group', as: 'groups' });
Task.belongsToMany(User, { through: 'UserTask', as: 'users' });
Task.belongsTo(TypeTask, { foreignKey: 'typeTaskId', as: 'type' });
Task.belongsTo(StatusTask, { foreignKey: 'statusTaskId', as: 'status' });
TypeTask.hasMany(Task, { foreignKey: 'typeTaskId', as: 'tasks' });
StatusTask.hasMany(Task, { foreignKey: 'statusTaskId', as: 'tasks' });
Group.belongsToMany(User, { through: 'UserGroup', as: 'users' });

// Group.belongsToMany(User, { through: 'UserGroup', as: 'users' });
// User.belongsToMany(Group, { through: 'UserGroup', as: 'groups' });



module.exports = {
    sequelize,
    User,
    Task,
    TypeTask,
    StatusTask,
    Group
};

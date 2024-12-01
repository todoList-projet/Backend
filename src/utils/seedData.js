const StatusTask = require('../models/StatusTask');
const TypeTask = require('../models/TypeTask');

const insertDefaultStatuses = async () => {
    const status = ['To Do', 'In Progress', 'Completed', 'Abandoned'];
    for (const name of status) {
        const [, created] = await StatusTask.findOrCreate({ where: { name } });
        if (created) {
            console.log(`Status '${name}' created.`);
        } else {
            console.log(`Status '${name}' already exists.`);
        }
    }
};

const insertDefaultTypeTasks = async () => {
    const types = ['Personal', 'Collaborative'];
    for (const name of types) {
        const [, created] = await TypeTask.findOrCreate({ where: { name } });
        if (created) {
            console.log(`TypeTask '${name}' created.`);
        } else {
            console.log(`TypeTask '${name}' already exists.`);
        }
    }
};

module.exports = {
    insertDefaultStatuses,
    insertDefaultTypeTasks,
};

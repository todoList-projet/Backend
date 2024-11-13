const StatusTask = require('../models/StatusTask');
const TypeTask = require('../models/TypeTask');

const insertDefaultStatuses = async () => {
    const status = ['to do', 'in progress', 'completed', 'abandoned'];
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
    const types = ['personal', 'collaborative'];
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

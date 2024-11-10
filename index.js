const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const routes = require('./routes');
const { specs, swaggerUi } = require('./config/swagger');
const Status = require('./models/Status');
const TypeTask = require('./models/TypeTask');
const PORT = process.env.PORT || 3006;

dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use('/api', routes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Function to insert default statuses
const insertDefaultStatuses = async () => {
    const status = ['to do', 'in progress', 'completed', 'abandoned'];
    for (const status_label of status) {
        const [, created] = await Status.findOrCreate({ where: { status_label } });
        if (created) {
            console.log(`Status '${status_label}' created.`);
        } else {
            console.log(`Status '${status_label}' already exists.`);
        }
    }
};

// Function to insert default type tasks
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

// Test database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        sequelize.sync({ alter: false })
            .then(() => {
                insertDefaultStatuses();
                insertDefaultTypeTasks();
            });
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
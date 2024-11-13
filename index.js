const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const routes = require('./routes');
const { specs, swaggerUi } = require('./config/swagger');
const {insertDefaultStatuses, insertDefaultTypeTasks} = require("./utils/seedData");
const PORT = process.env.PORT || 3006;

dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use('/api', routes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Test database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        sequelize.sync({ alter: false }) // Crée ou met à jour les tables en fonction des modèles
            .then(() => {
                console.log('All tables have been synced successfully.');
                // Insertions de données initiales
                insertDefaultStatuses();
                insertDefaultTypeTasks();
            })
            .catch(err => {
                console.error('Error syncing the tables:', err);
            });
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
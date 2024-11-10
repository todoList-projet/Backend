// config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Todo API',
            version: '1.0.0',
            description: 'API de gestion de tâches',
        },
        servers: [
            {
                url: 'http://localhost:3005', // Update with your URL
                description: 'Development server',
            },
        ],
    },
    apis: ['./routes/*.js'], // Paths to your route files
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
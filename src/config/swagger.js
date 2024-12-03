const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');

const swaggerDocument = yaml.load('./src/config/swagger.yaml');

const options = {
    definition: swaggerDocument,
    apis: ['./src/routes/*.js'], // Corrected path to your route files
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
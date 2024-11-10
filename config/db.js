const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: true, // Mettre à true pour voir les requêtes SQL
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            timestamps: false, // Ajoute automatiquement createdAt et updatedAt
            underscored: true // Utilise des snake_case plutôt que des camelCase
        }
    }
);

// Fonction pour tester la connexion
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connexion à la base de données établie avec succès.');
        return true;
    } catch (error) {
        console.error('❌ Impossible de se connecter à la base de données:', error);
        return false;
    }
};

// Test immédiat de la connexion
testConnection();

module.exports = sequelize;
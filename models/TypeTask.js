const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TypeTask = sequelize.define('TypeTask', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = TypeTask;
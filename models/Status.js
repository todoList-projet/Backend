const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Status = sequelize.define('Status', {
    status_label: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'status'
});

module.exports = Status;
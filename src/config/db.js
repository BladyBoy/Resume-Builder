const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('resume_db', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;

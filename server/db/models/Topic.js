const conn = require('../db');
const Sequelize = require('sequelize');

const Topic = conn.define('topic',
    {
        dominantTopicNum: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        numberOfDocuments: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        percentDocuments: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    })

module.exports = Topic;

const conn = require('../db');
const Sequelize = require('sequelize');

const TopicKeyword = conn.define('topickeyword',
    {
        keyword: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        rank: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })

module.exports = TopicKeyword;

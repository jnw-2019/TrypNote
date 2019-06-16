const conn = require('../db');
const Sequelize = require('sequelize');

const Sentiment = conn.define('sentiment',
    {
        anger: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        anticipation: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        disgust: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        fear: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        joy: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        sadness: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        surprise: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        trust: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        compound: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        negative: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        neutral: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        positive: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
    })

module.exports = Sentiment;

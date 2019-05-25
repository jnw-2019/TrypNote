const Sequlize = require('sequelize');
const conn = new Sequlize(process.env.DATABASE_URL, {
  logging: false,
});

module.exports = conn;

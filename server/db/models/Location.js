const conn = require('../db');
const Sequelize = require('sequelize');

const Location = conn.define('location', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1
  },
  latitude: {
    // trying to ssee what is the response from mapbox api
    type: Sequelize.STRING,
    allowNull: false
  },
  longitude: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Location;

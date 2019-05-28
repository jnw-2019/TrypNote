const conn = require('../db');
const Sequelize = require('sequelize');

const Weather = conn.define('weather', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1
  },
  forecast: {
    // looking through weather apis
    // example json https://samples.openweathermap.org/data/2.5/weather?id=2172797&appid=b6907d289e10d714a6e88b30761fae22
    type: Sequelize.STRING,
    allowNull: false
  },
  degrees: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: true
    }
  }
});

module.exports = Weather;

const conn = require('../db');

const Entry = conn.define('entry', {
  id: {
    type: conn.Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: conn.Sequelize.UUIDV1,
  },
  title: {
    type: conn.Sequelize.STRING,
    allowNull: false,
  },
  text: {
    type: conn.Sequelize.TEXT,
    allowNull: false,
  },
  //Tags & Attachments Will Be Placed In A Seperate Table With An Entry Foreign Key
});

module.exports = Entry;

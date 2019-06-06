const Entry = require('./Entry');
const User = require('./User');
const Location = require('./Location');
const Weather = require('./Weather');
const Category = require('./Category');

Entry.hasOne(Location);
Entry.hasOne(Weather);
Location.belongsTo(Entry);
Weather.belongsTo(Entry);
Category.hasMany(Weather);
Category.hasMany(Location);
Weather.belongsTo(Category);
Location.belongsTo(Category);
Entry.belongsTo(User);
User.hasMany(Entry);

module.exports = {
  Entry,
  Location,
  Weather,
  Category,
  User
};

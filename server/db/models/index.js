const Entry = require('./Entry');
const User = require('./User');
const Location = require('./Location');
const Weather = require('./Weather');
const Category = require('./Category');
const Topic = require('./Topic');
const TopicKeyword = require('./TopicKeyword');
const Sentiment = require('./Sentiment');

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
Entry.belongsToMany(Topic, {through: 'topicentry'});
Topic.belongsToMany(Entry, {through: 'topicentry'});
Topic.hasMany(TopicKeyword);
TopicKeyword.belongsTo(Topic);
User.hasMany(Topic);
Topic.belongsTo(User);
Sentiment.hasMany(Entry);
Entry.belongsTo(Sentiment);

module.exports = {
  Entry,
  Location,
  Weather,
  Category,
  User,
  Topic,
  TopicKeyword,
  Sentiment
};

const conn = require('./db');
const { Entry, Weather, Location, Category } = require('./models/');

const syncAndSeed = () => {
  return conn.sync({ force: true }).then(() => {
    Promise.all([
      Entry.create({
        title: 'My First Journal',
        text: 'Today I wrote my very first journal entry on the Trypy App'
      }),
      Entry.create({
        title: 'My Second Journal',
        text:
          'Today I wrote my second journal entry on the Trypy App and it was foggy outside'
      })
    ]).then(entries => {
      return Promise.all([
        Location.create({
          latitude: '40.7648',
          longitude: '-73.9808',
          entryId: entries[0].dataValues.id
        }),
        Location.create({
          latitude: '40.704965',
          longitude: '-74.009291',
          entryId: entries[1].dataValues.id
        }),
        Weather.create({
          forecast: 'cloudy',
          degrees: 88,
          entryId: entries[0].dataValues.id
        }),
        Weather.create({
          forecast: 'sunny',
          degrees: 75,
          entryId: entries[1].dataValues.id
        })
      ]);
    });
  });
};

module.exports = syncAndSeed;

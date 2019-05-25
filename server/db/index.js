const conn = require('./db');
const { Entry } = require('./models/');

const syncAndSeed = () => {
  return conn.sync({ force: true }).then(() => {
    Promise.all([
      Entry.create({
        title: 'My First Journal',
        text: 'Today I wrote my very first journal entry on the Trypy App',
      }),
      Entry.create({
        title: 'My Second Journal',
        text:
          'Today I wrote my second journal entry on the Trypy App and it was foggy outside',
      }),
    ]);
  });
};

module.exports = syncAndSeed;

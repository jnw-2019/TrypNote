const conn = require('./db');
const { Entry, User, Weather, Location, Category } = require('./models/');

const users = [{
  firstname: 'Jane',
  lastname: 'Smith',
  phonenumber: '555-321-9800',
  email: 'jane@email.com',
  password: '12345'
}, {
  firstname: 'Joe',
  lastname: 'Boss',
  phonenumber: '555-000-1239',
  email: 'joe@email.com',
  password: '54321',
  admin: true
}]

const syncAndSeed = () => {
  return conn.sync({ force: true }).then(() => {
    Promise.all([
      User.create(users[0]),
      User.create(users[1])
    ])
    .then(uploadusers => {
      Promise.all([
        Entry.create({
          title: 'My First Journal',
          text: 'Today I wrote my very first journal entry on the Trypy App',
          userId: uploadusers[0].dataValues.id
        }),
        Entry.create({
          title: 'My Second Journal',
          text:
            'Today I wrote my second journal entry on the Trypy App and it was foggy outside',
          userId: uploadusers[0].dataValues.id
        })
        .then(entries => {
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
          ])
        })
      ]);
    });
  });
};

module.exports = syncAndSeed;

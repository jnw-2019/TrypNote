const conn = require('./db');
const faker = require('faker');
const secondSeedFunc = require('./entrySeed')
const { Entry, User, Weather, Location, Category } = require('./models/');

const users = [
  {
    firstname: 'Jane',
    lastname: 'Smith',
    phonenumber: '555-321-9800',
    email: 'jane@email.com',
    password: '12345',
  },
  {
    firstname: 'Joe',
    lastname: 'Boss',
    phonenumber: '555-000-1239',
    email: 'joe@email.com',
    password: '54321',
    admin: true,
  },
];

const syncAndSeed = () => {
  return conn.sync({ force: true }).then(() => {
    return Promise.all([User.create(users[0]), User.create(users[1])]).then(
      uploadusers => {
        Promise.all([
          Entry.create({
            title: faker.fake('{{lorem.sentence}}'),
            text: faker.fake('{{lorem.paragraph}}'),
            headerImage: faker.fake('{{image.nature}}'),
            userId: uploadusers[0].dataValues.id,
          }),
          Entry.create({
            title: faker.fake('{{lorem.sentence}}'),
            text: faker.fake('{{lorem.paragraph}}'),
            headerImage: faker.fake('{{image.business}}'),
            userId: uploadusers[0].dataValues.id,
          }),
          Entry.create({
            title: faker.fake('{{lorem.sentence}}'),
            text: faker.fake('{{lorem.paragraph}}'),
            headerImage: faker.fake('{{image.nightlife}}'),
            userId: uploadusers[0].dataValues.id,
          }),
          Entry.create({
            title: faker.fake('{{lorem.sentence}}'),
            text: faker.fake('{{lorem.paragraph}}'),
            headerImage: faker.fake('{{image.technics}}'),
            userId: uploadusers[0].dataValues.id,
          }),
          Entry.create({
            title: faker.fake('{{lorem.sentence}}'),
            text: faker.fake('{{lorem.paragraph}}'),
            headerImage: faker.fake('{{image.sports}}'),
            userId: uploadusers[0].dataValues.id,
          }),
        ]).then(entries => {
          return Promise.all([
            Location.create({
              latitude: faker.fake('{{address.latitude}}'),
              longitude: faker.fake('{{address.longitude}}'),
              entryId: entries[0].dataValues.id,
            }),
            Location.create({
              latitude: faker.fake('{{address.latitude}}'),
              longitude: faker.fake('{{address.longitude}}'),
              entryId: entries[1].dataValues.id,
            }),
            Location.create({
              latitude: faker.fake('{{address.latitude}}'),
              longitude: faker.fake('{{address.longitude}}'),
              entryId: entries[2].dataValues.id,
            }),
            Location.create({
              latitude: faker.fake('{{address.latitude}}'),
              longitude: faker.fake('{{address.longitude}}'),
              entryId: entries[3].dataValues.id,
            }),
            Location.create({
              latitude: faker.fake('{{address.latitude}}'),
              longitude: faker.fake('{{address.longitude}}'),
              entryId: entries[4].dataValues.id,
            }),
            Weather.create({
              forecast: 'cloudy',
              degrees: 88,
              entryId: entries[0].dataValues.id,
            }),
            Weather.create({
              forecast: 'sunny',
              degrees: 75,
              entryId: entries[1].dataValues.id,
            }),
            Weather.create({
              forecast: 'sunny',
              degrees: 90,
              entryId: entries[2].dataValues.id,
            }),
            Weather.create({
              forecast: 'clear',
              degrees: 81,
              entryId: entries[3].dataValues.id,
            }),
            Weather.create({
              forecast: 'sunny',
              degrees: 77,
              entryId: entries[4].dataValues.id,
            }),
          ]);
        });
      }
    )
      .then(() => secondSeedFunc());
  });
};

module.exports = syncAndSeed;

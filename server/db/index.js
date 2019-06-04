const conn = require('./db');
const faker = require('faker');
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
    Promise.all([User.create(users[0]), User.create(users[1])]).then(
      uploadusers => {
        Promise.all([
          Entry.create({
            title: faker.fake('{{lorem.sentence}}'),
            text: faker.fake('{{lorem.paragraph}}'),
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
            userId: uploadusers[0].dataValues.id,
          }),
        ]).then(entries => {
          return Promise.all([
            Location.create({
              latitude: 40.683999,
              longitude: -73.975569,
              markerName: 'Barlcays Center',
              entryId: entries[0].dataValues.id,
            }),
            Location.create({
              latitude: 40.674108,
              longitude: -73.970037,
              markerName: 'Grand Army Plaza',
              entryId: entries[1].dataValues.id,
            }),
            Location.create({
              latitude: 40.693389,
              longitude: -74.001699,
              markerName: 'Brooklyn Bridge Pier 6',
              entryId: entries[2].dataValues.id,
            }),
            Location.create({
              latitude: 40.704943,
              longitude: -73.992368,
              markerName: `Dumbo Jane's Carosel`,
              entryId: entries[3].dataValues.id,
            }),
            Location.create({
              latitude: 40.691874,
              longitude: -73.975137,
              markerName: 'Fort Greene Park',
              entryId: entries[4].dataValues.id,
            }),
            Weather.create({
              forecast: 'cloudy',
              degrees: 88,
              icon: 'cloud',
              entryId: entries[0].dataValues.id,
            }),
            Weather.create({
              forecast: 'sunny',
              degrees: 75,
              icon: 'sun',
              entryId: entries[1].dataValues.id,
            }),
            Weather.create({
              forecast: 'sunny',
              degrees: 90,
              icon: 'sun',
              entryId: entries[2].dataValues.id,
            }),
            Weather.create({
              forecast: 'clear',
              degrees: 81,
              icon: 'sun',
              entryId: entries[3].dataValues.id,
            }),
            Weather.create({
              forecast: 'sunny',
              degrees: 77,
              icon: 'sun',
              entryId: entries[4].dataValues.id,
            }),
          ]);
        });
      }
    );
  });
};

module.exports = syncAndSeed;

const conn = require('./db');
const { Entry, User } = require('./models/');

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
        }),
      ]);
    })
    .catch(err => console.log(err))
  });
};

module.exports = syncAndSeed;

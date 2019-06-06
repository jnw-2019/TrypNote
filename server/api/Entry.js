const router = require('express').Router();
const { Entry, Location, Weather, User } = require('../db/models/');

//GET All Entries /api/entries
router.get('/', (req, res, next) => {
  Entry.findAll({
    include: [{ model: Location }, { model: Weather }],
  })
    .then(entries => res.send(entries))
    .catch(next);
});

router.get('/:entryId', (req, res, next) => {
  Entry.findByPk(req.params.entryId, {
    include: [{ model: Location }, { model: Weather }],
  })
    .then(entry => res.json(entry))
    .catch(next);
});

router.get('/user/:userId', (req, res, next) => {
  User.findByPk(req.params.userId, {
    include: [
      { model: Entry, include: [{ model: Weather }, { model: Location }] },
    ],
  }).then(userWithEntries => res.send(userWithEntries));
});

router.post('/createEntry/users/:userId', (req, res, next) => {
  Entry.create({
    title: req.body.title,
    text: req.body.text,
    userId: req.params.userId,
  })
    .then(entry => {
      console.log(entry.userId);
      res.sendStatus(200);
    })
    .catch(next);
  // Promise.all([User.findByPk(req.params.userId), Entry.create(req.body)])
  //   .then(([user, entry]) => entry.setUser(user))
  //   .then(() => console.log('hello?'))
  //   .catch(next);
});

module.exports = router;

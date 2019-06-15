const router = require('express').Router();
const { Entry, Location, Weather, User, Topic, TopicKeyword } = require('../db/models/');

//GET All Entries /api/entries
router.get('/', (req, res, next) => {
  Entry.findAll({
    include: [
      { model: Location },
      { model: Weather },
      {
        model: Topic,
        include: [{ model: TopicKeyword }]
      }
    ]
  })
    .then(entries => res.send(entries))
    .catch(next);
});

router.get('/:entryId', (req, res, next) => {
  Entry.findByPk(req.params.entryId, {
    include: [{ model: Location }, { model: Weather }]
  })
    .then(entry => res.json(entry))
    .catch(next);
});

router.get('/user/:userId', (req, res, next) => {
  User.findByPk(req.params.userId, {
    include: [
      { model: Entry, include: [{ model: Weather }, { model: Location }] }
    ]
  }).then(userWithEntries => res.send(userWithEntries));
});

router.get('/limit/:limitnum/user/:userId', (req, res, next) => {
  User.findByPk(req.params.userId, {
    include: [
      { model: Entry, limit: req.params.limitnum },
    ],
    order: [
      // Will escape title and validate DESC against a list of valid direction parameters
      ['createdAt', 'DESC'],
    ],
  }).then(userWithEntries => res.send(userWithEntries));
});

router.post('/createEntry/users/:userId', (req, res, next) => {
  Entry.create({
    title: req.body.title,
    text: req.body.text,
    userId: req.params.userId
  })
    .then(entry => {
      res.send(entry);
    })
    .catch(next);
});

module.exports = router;

const router = require('express').Router();
const { Entry, Location, Weather, User, Topic, TopicKeyword, Sentiment } = require('../db/models/');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

//GET All Entries /api/entries
router.get('/', (req, res, next) => {
  Entry.findAll({
    include: [
      { model: Location },
      { model: Weather },
      {
        model: Topic,
        include: [{ model: TopicKeyword }]
      },
      { model: Sentiment }
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

router.get('/range/from/:fromdate/to/:todate/user/:userId', (req, res, next) => {
  console.log(req.params.fromdate.substring(0, 4))
  console.log(req.params.fromdate.substring(5, 6))
  console.log(req.params.fromdate.substring(7, 8))
  console.log(req.params.todate.substring(0, 4))
  console.log(req.params.todate.substring(4, 6))
  console.log(req.params.todate.substring(6, 8))
  User.findByPk(req.params.userId, {
    include: [
      {
        model: Entry,
        where: {
          createdAt: {
            [Op.lt]: new Date(req.params.todate.substring(0, 4), req.params.todate.substring(4, 6), req.params.todate.substring(6, 8)),
            [Op.gt]: new Date(req.params.fromdate.substring(0, 4), req.params.fromdate.substring(4, 6), req.params.fromdate.substring(6, 8)),
          }
        }
        // createdAt < [timestamp] AND createdAt > [timestamp]
      },
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

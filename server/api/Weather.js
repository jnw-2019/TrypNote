const router = require('express').Router();
const { Weather } = require('../db/models');

router.get('/', (req, res, next) => {
  Weather.findAll()
    .then(weath => res.json(weath))
    .catch(next);
});

module.exports = router;

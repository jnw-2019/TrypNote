const router = require('express').Router();
const { Location } = require('../db/models');

router.get('/', (req, res, next) => {
  Location.findAll()
    .then(locations => res.json(locations))
    .catch(next);
});

module.exports = router;

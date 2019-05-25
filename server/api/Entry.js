const router = require('express').Router();
const { Entry } = require('../db/models/');

//GET All Entries /api/entries
router.get('/', (req, res, next) => {
  Entry.findAll()
    .then(entries => res.send(entries))
    .catch(next);
});

module.exports = router;

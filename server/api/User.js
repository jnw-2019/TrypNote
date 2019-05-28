const router = require('express').Router();
const { User } = require('../db/models/');

//GET All Users /api/users
router.get('/', (req, res, next) => {
  User.findAll()
    .then(entries => res.send(entries))
    .catch(next);
});

module.exports = router;

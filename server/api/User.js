const router = require('express').Router();
const { User } = require('../db/models/');

//POST User - creates new user from request body
router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(newUser => {
      res.send(newUser);
    })
    .catch(next);
})

//GET All Users /api/users
router.get('/', (req, res, next) => {
  User.findAll()
    .then(entries => res.send(entries))
    .catch(next);
});

module.exports = router;

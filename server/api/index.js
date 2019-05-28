const router = require('express').Router();

router.use('/entries', require('./Entry'));
router.use('/users', require('./User'))

module.exports = router;

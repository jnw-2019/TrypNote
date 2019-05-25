const router = require('express').Router();

router.use('/api/entries', require('./Entry'));

module.exports = router;

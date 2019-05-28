const router = require('express').Router();

router.use('/api/entries', require('./Entry'));
router.use('/api/locations', require('./Location'));
router.use('/api/weathers', require('./Weather'));
router.use('/api/categories', require('./Category'));

module.exports = router;

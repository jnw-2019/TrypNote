const router = require('express').Router();

router.use('/entries', require('./Entry'));
router.use('/users', require('./User'))
router.use('/locations', require('./Location'));
router.use('/weathers', require('./Weather'));
router.use('/categories', require('./Category'));

module.exports = router;

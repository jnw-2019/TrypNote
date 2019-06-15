const router = require('express').Router();
const { Location } = require('../db/models');

router.get('/', (req, res, next) => {
  Location.findAll()
    .then(locations => res.json(locations))
    .catch(next);
});

router.post('/:entryId', (req, res, next) => {
  Location.create({
    longitude: req.body.lon,
    latitude: req.body.lat,
    markerName: req.body.locationName,
    entryId: req.params.entryId,
  })
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;

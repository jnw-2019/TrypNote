const router = require('express').Router();
const { Weather } = require('../db/models');
const axios = require('axios');
const { openweather } = require('../../config');

router.get('/', (req, res, next) => {
  Weather.findAll()
    .then(weath => res.json(weath))
    .catch(next);
});


router.post('/weatheratlocation', (req, res, next) => {
  const location = req.body;
  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&APPID=${openweather.APPID}`)
    .then(response => response.data)
    .then(data => {
      res.send(data)
    })
});

module.exports = router;

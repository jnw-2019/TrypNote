const router = require('express').Router();
const { Weather } = require('../db/models');
const axios = require('axios');
const config = require('../../config');

const APPID = config.get('APPID')

router.get('/', (req, res, next) => {
  Weather.findAll()
    .then(weath => res.json(weath))
    .catch(next);
});


router.post('/weatheratlocation', (req, res, next) => {
  const location = req.body;
  console.log(APPID)
  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=imperial&APPID=${APPID}`)
    .then(response => response.data)
    .then(data => {
      res.send(data)
    })
});

module.exports = router;

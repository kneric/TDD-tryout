const express = require('express');
const router = express.Router();
const {signin, signup} = require('../controllers/indexC');

router
  .get('/', (req, res) => {
    res.status(200).json('this is home')
  })
  .post('/signup', signup)
  .post('/signin', signin)

module.exports = router

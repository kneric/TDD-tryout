const express = require('express');
const router = express.Router();
const {createArticle} = require('../controllers/articleC');

router
  .post('/', createArticle)

module.exports = router
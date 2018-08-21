const express = require('express');
const router = express.Router();
const {createArticle, allArticle} = require('../controllers/articleC');

router
  .post('/', createArticle)
  .get('/', allArticle)

module.exports = router
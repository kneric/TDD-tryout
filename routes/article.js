const express = require('express');
const router = express.Router();
const {createArticle, allArticle, updateArticle} = require('../controllers/articleC');

router
  .post('/', createArticle)
  .get('/', allArticle)
  .put('/:id', updateArticle)

module.exports = router
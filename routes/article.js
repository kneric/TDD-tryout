const express = require('express');
const router = express.Router();
const {
  createArticle, 
  allArticle, 
  userArticle, 
  updateArticle,
  deleteArticle
} = require('../controllers/articleC');

router
  .post('/', createArticle)
  .get('/', allArticle)
  .get('/user', userArticle)
  .put('/:id', updateArticle)
  .delete('/:id', deleteArticle)

module.exports = router
const express = require('express');
const router = express.Router();
const {
  createArticle, 
  allArticle, 
  userArticle, 
  articleById,
  updateArticle,
  deleteArticle
} = require('../controllers/articleC');

router
  .post('/', createArticle)
  .get('/', allArticle)
  .get('/user', userArticle)
  .get('/:id', articleById)
  .put('/:id', updateArticle)
  .delete('/:id', deleteArticle)

module.exports = router
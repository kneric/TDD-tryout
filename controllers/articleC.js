const Article = require('../models/article');

const createArticle = (req, res) => {
  const {title, content, thumbnail, author} = req.body;

  Article.create({
    title,
    content,
    thumbnail,
    author
  })
  .then(article => {
    res.status(201).json(article)
  })
  .catch (err => {
    res.status(400).json(err)
  })
}

const allArticle = (req, res) => {
  Article.find()
  .then(articles => {
    res.status(200).json(articles)
  })
  .catch (err => {
    res.status(400).json(err)
  })
}

module.exports = {
  createArticle,
  allArticle
};

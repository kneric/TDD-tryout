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

const userArticle = (req, res) => {
  Article.find({author: req.user._id})
  .then(articles => {
    if (articles){
      res.status(200).json(articles)
    } else {
      res.status(404).json('user not found')  
    }
  })
  .catch (err => {
    res.status(400).json(err)
  })
}

const updateArticle = (req, res) => {
  Article.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
  .then( article => {
    res.status(200).json(article)
  })
  .catch( err => {
    res.status(400).json(err)
  })
}

const deleteArticle = (req, res) => {
  Article.findByIdAndRemove(req.params.id)
  .then( article => {
    res.status(200).json(article)
  })
  .catch( err => {
    res.status(400).json(err)
  })
}

module.exports = {
  createArticle,
  allArticle,
  userArticle,
  updateArticle,
  deleteArticle
};

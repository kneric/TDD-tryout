const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'please input the title']
  },
  content: {
    type: String,
    required: [true, 'please input the title']
  },
  thumbnail: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: undefined
    }
  ]
}, {timestamps:true})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article;

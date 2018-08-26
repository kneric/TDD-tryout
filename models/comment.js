const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  comment: {
    type: String,
    required: [true, 'please input your comment']
  },
  commenter: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: 'Article'
  }
}, {timestamps:true})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment;

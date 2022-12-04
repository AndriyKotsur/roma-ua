const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Обов'язкове поле"],
    trim: true,
    maxlength: [50, "Поле не може містити більше 50 символів"],
  },
  text: {
    type: String,
    required: [true, "Обов'язкове поле"],
    trim: true,
    maxlength: [1500, "Поле не може містити більше 1500 символів"],
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  date: {
    type: String,
  },
  title: {
    type: String,
    trim: true,
    maxlength: [250, "Поле не може містити більше 250 символів"],
  },
  news: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'News',
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
  },
  portrait: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portrait',
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { CommentSchema, Comment };

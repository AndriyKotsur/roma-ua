const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'blog'
  },
  name: {
    type: String,
    required: [true, "Обов'язкове поле"],
    trim: true,
    maxlength: [50, "Поле не може містити більше 50 символів"],
  },
  avatar: {
    type: String,
  },
  position: {
    type: String,
    required: [true, "Обов'язкове поле"],
    trim: true,
    maxlength: [150, "Поле не може містити більше 150 символів"],
  },
  description: {
    type: String,
    required: [true, "Обов'язкове поле"],
    trim: true,
    maxlength: [250, "Поле не може містити більше 250 символів"],
  },
  url: {
    type: String,
    required: [true, "Обов'язкове поле"],
    unique: true,
  },
  title: {
    type: String,
    required: [true, "Обов'язкове поле"],
    trim: true,
    maxlength: [250, "Поле не може містити більше 250 символів"],
  },
  content: {
    type: String,
    required: [true, "Обов'язкове поле"],
    trim: true,
  },
  image: {
    type: String,
  },
  source: {
    type: String,
    trim: true,
    maxlength: [150, "Поле не може містити більше 150 символів"],
  },
  author: {
    type: String,
    trim: true,
    maxlength: [50, "Поле не може містити більше 50 символів"],
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  tags: [{
    type: String,
    trim: true,
    maxlength: [15, "Поле не може містити більше 15 символів"],
  }],
  views: {
    type: Number,
    default: 0
  },
  date: {
    type: String,
  },
}, { timestamps: true });

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = { BlogSchema, Blog };

const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'video'
  },
  category: {
    type: String,
    required: [true, "Обов'язкове поле"],
  },
  title: {
    type: String,
    required: [true, "Обов'язкове поле"],
    trim: true,
    maxlength: [250, "Поле не може містити більше 250 символів"],
  },
  thumbnail: {
    type: String,
    required: [true, "Обов'язкове поле"],
    trim: true
  },
  url: {
    type: String,
    required: [true, "Обов'язкове поле"],
    unique: true,
  },
  content: {
    type: String,
    required: [true, "Обов'язкове поле"],
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
  }
}, { timestamps: true });

const Video = mongoose.model('Video', VideoSchema);

module.exports = { VideoSchema, Video };

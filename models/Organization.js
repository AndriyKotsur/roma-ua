const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'organization'
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
  url: {
    type: String,
    required: [true, "Обов'язкове поле"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Обов'язкове поле"],
    trim: true,
    maxlength: [250, "Поле не може містити більше 250 символів"],
  },
  content: {
    type: String,
    required: [true, "Обов'язкове поле"],
  },
  image: {
    type: String,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  date: {
    type: String,
  },
  views: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = { OrganizationSchema, Organization };

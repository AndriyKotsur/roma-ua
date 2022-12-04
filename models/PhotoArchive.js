const mongoose = require('mongoose');

const PhotoArchiveSchema = new mongoose.Schema({
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
  images: [{
    type: String,
  }]
}, { timestamps: true });

const PhotoArchive = mongoose.model('PhotoArchive', PhotoArchiveSchema);

module.exports = { PhotoArchiveSchema, PhotoArchive };

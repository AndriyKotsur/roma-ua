const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Обов'язкове поле"],
    trim: true,
    maxlength: [150, "Поле не може містити більше 150 символів"],
  },
  url: {
    type: String,
    required: [true, "Обов'язкове поле"],
    unique: true,
  },
}, { timestamps: true });

const Media = mongoose.model('Media', MediaSchema);

module.exports = { MediaSchema, Media };

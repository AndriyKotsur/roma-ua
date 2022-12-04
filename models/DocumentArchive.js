const mongoose = require('mongoose');

const DocumentArchiveSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Обов'язкове поле"],
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
  annotation: {
    type: String,
    required: [true, "Обов'язкове поле"],
    trim: true,
    maxlength: [2500, "Поле не може містити більше 2500 символів"],
  },
  bibliographicDescription: {
    type: String,
    trim: true,
    maxlength: [2500, "Поле не може містити більше 2500 символів"],
  },
  document: {
    type: String,
  },
}, { timestamps: true });

const DocumentArchive = mongoose.model('DocumentArchive', DocumentArchiveSchema);

module.exports = { DocumentArchiveSchema, DocumentArchive };

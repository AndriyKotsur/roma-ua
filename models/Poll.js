const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Обов'язкове поле"],
    trim: true,
    maxlength: [250, "Поле не може містити більше 250 символів"],
  },
  answers: [{
    title: {
      type: String,
      required: [true, "Обов'язкове поле"],
      trim: true,
      maxlength: [150, "Поле не може містити більше 150 символів"],
    },
    votes: {
      type: Number,
      default: 0,
    },
  }]
}, { timestamps: true });

const Poll = mongoose.model('Poll', PollSchema);

module.exports = { PollSchema, Poll };

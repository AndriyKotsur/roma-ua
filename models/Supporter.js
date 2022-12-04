const mongoose = require('mongoose');

const SupporterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 250
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    maxlength: 15
  },
}, { timestamps: true });

const Supporter = mongoose.model('Supporter', SupporterSchema);

module.exports = { SupporterSchema, Supporter };

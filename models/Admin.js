const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Обов'язкове поле"],
    trim: true,
    maxlength: [50, "Поле не може містити більше 50 символів"],
  },
  hashedPassword: {
    type: String,
    required: [true, "Обов'язкове поле"],
  },
}, { timestamps: true });

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = { AdminSchema, Admin };

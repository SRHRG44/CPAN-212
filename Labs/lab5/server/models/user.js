const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
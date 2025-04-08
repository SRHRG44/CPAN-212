const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true }, // In a real application, hash this!
  registrationDate: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema, 'users'); // Collection name 'users'

module.exports = User;
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB (assignment2)');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], trim: true },
  ingredients: [{ type: String, trim: true }],
  steps: [{ type: String, trim: true }],
});

const Recipe = mongoose.model('Recipe', recipeSchema, 'recipies');

module.exports = Recipe;

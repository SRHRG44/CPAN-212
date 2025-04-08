const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], trim: true },
  ingredients: [{ type: String, trim: true }],
  steps: [{ type: String, trim: true }],
});

const Recipe = mongoose.model('Recipe', recipeSchema, 'recipes'); // Collection name 'recipes'

module.exports = Recipe;

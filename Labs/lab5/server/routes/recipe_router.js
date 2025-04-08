const express = require('express');
const router = express.Router();
const recipeController = require('../Controllers/recipe_controller'); // Adjusted path to match your structure

// GET all recipes
router.get('/recipes', recipeController.getAllRecipes); // Changed path to /recipes

// GET a recipe by ID
router.get('/recipes/:id', recipeController.getRecipeById); // Changed path to /recipes/:id

module.exports = router;
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe_controller');
// GET all recipes
router.get('/recipe', recipeController.getAllRecipes);

// POST a new recipe
router.post('/recipe', recipeController.createRecipe);

// GET a recipe by ID
router.get('/recipe/:id', recipeController.getRecipeById);

// PUT (update) a recipe by ID
router.put('/recipe/:id', recipeController.updateRecipeById);

// DELETE a recipe by ID
router.delete('/recipe/:id', recipeController.deleteRecipeById);

module.exports = router;
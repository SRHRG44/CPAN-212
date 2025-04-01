const Recipe = require('../models/recipe.js');

// GET all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST a new recipe
exports.createRecipe = async (req, res) => {
  const recipe = new Recipe({
    name: req.body.name,
    description: req.body.description,
    difficulty: req.body.difficulty,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
  });

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET a recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe == null) {
      return res.status(404).json({ message: 'Cannot find recipe' });
    }
    res.json(recipe);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// PUT (update) a recipe by ID
exports.updateRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe == null) {
      return res.status(404).json({ message: 'Cannot find recipe' });
    }

    if (req.body.name != null) {
      recipe.name = req.body.name;
    }
    if (req.body.description != null) {
      recipe.description = req.body.description;
    }
    if (req.body.difficulty != null) {
      recipe.difficulty = req.body.difficulty;
    }
    if (req.body.ingredients != null) {
      recipe.ingredients = req.body.ingredients;
    }
    if (req.body.steps != null) {
      recipe.steps = req.body.steps;
    }

    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE a recipe by ID
exports.deleteRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe == null) {
      return res.status(404).json({ message: 'Cannot find recipe' });
    }
    await recipe.deleteOne();
    res.json({ message: 'Deleted Recipe' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
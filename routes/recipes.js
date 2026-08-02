const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');

// GET all recipes
router.get('/', recipesController.getAllRecipes);

// GET single recipe
router.get('/:id', recipesController.getRecipeById);

// POST new recipe
router.post('/', recipesController.createRecipe);

// PUT update recipe
router.put('/:id', recipesController.updateRecipe);

// DELETE recipe
router.delete('/:id', recipesController.deleteRecipe);

module.exports = router;

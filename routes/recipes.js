const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');
const isAuthenticated = require('../middleware/isAuthenticated');

// GET all recipes
router.get('/', recipesController.getAllRecipes);

// GET single recipe
router.get('/:id', recipesController.getRecipeById);

// POST new recipe (protected)
router.post('/', isAuthenticated, recipesController.createRecipe);

// PUT update recipe (protected)
router.put('/:id', isAuthenticated, recipesController.updateRecipe);

// DELETE recipe
router.delete('/:id', recipesController.deleteRecipe);

module.exports = router;

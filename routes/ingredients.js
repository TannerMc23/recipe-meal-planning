const express = require('express');
const router = express.Router();
const ingredientsController = require('../controllers/ingredientsController');

// GET all ingredients
router.get('/', ingredientsController.getAllIngredients);

// GET single ingredient
router.get('/:id', ingredientsController.getIngredientById);

// POST new ingredient
router.post('/', ingredientsController.createIngredient);

// PUT update ingredient
router.put('/:id', ingredientsController.updateIngredient);

// DELETE ingredient
router.delete('/:id', ingredientsController.deleteIngredient);

module.exports = router;

const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

// GET all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving recipes', error: err.message });
  }
};

// GET single recipe by id
const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid recipe id' });
    }

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving recipe', error: err.message });
  }
};

// POST create a new recipe
const createRecipe = async (req, res) => {
  try {
    const { title, cuisine, prepTime, cookTime, servings, difficulty, instructions, createdBy } =
      req.body;

    if (
      !title ||
      !cuisine ||
      prepTime === undefined ||
      cookTime === undefined ||
      !servings ||
      !difficulty ||
      !instructions ||
      !createdBy
    ) {
      return res.status(400).json({
        message:
          'title, cuisine, prepTime, cookTime, servings, difficulty, instructions, and createdBy are all required'
      });
    }

    const newRecipe = new Recipe({
      title,
      cuisine,
      prepTime,
      cookTime,
      servings,
      difficulty,
      instructions,
      createdBy
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: err.message });
    }
    res.status(500).json({ message: 'Error creating recipe', error: err.message });
  }
};

// PUT update an existing recipe
const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid recipe id' });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json(updatedRecipe);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: err.message });
    }
    res.status(500).json({ message: 'Error updating recipe', error: err.message });
  }
};

// DELETE a recipe
const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid recipe id' });
    }

    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting recipe', error: err.message });
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
};

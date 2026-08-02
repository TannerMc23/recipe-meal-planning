const mongoose = require('mongoose');
const Ingredient = require('../models/Ingredient');

// GET all ingredients
const getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving ingredients', error: err.message });
  }
};

// GET single ingredient by id
const getIngredientById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ingredient id' });
    }

    const ingredient = await Ingredient.findById(id);
    if (!ingredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    res.status(200).json(ingredient);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving ingredient', error: err.message });
  }
};

// POST create a new ingredient
const createIngredient = async (req, res) => {
  try {
    const { name, category, unit, recipeId } = req.body;

    if (!name || !category || !unit || !recipeId) {
      return res
        .status(400)
        .json({ message: 'name, category, unit, and recipeId are all required' });
    }

    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).json({ message: 'Invalid recipeId' });
    }

    const newIngredient = new Ingredient({ name, category, unit, recipeId });
    const savedIngredient = await newIngredient.save();
    res.status(201).json(savedIngredient);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: err.message });
    }
    res.status(500).json({ message: 'Error creating ingredient', error: err.message });
  }
};

// PUT update an existing ingredient
const updateIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ingredient id' });
    }

    if (req.body.recipeId && !mongoose.Types.ObjectId.isValid(req.body.recipeId)) {
      return res.status(400).json({ message: 'Invalid recipeId' });
    }

    const updatedIngredient = await Ingredient.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedIngredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    res.status(200).json(updatedIngredient);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: err.message });
    }
    res.status(500).json({ message: 'Error updating ingredient', error: err.message });
  }
};

// DELETE an ingredient
const deleteIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ingredient id' });
    }

    const deletedIngredient = await Ingredient.findByIdAndDelete(id);
    if (!deletedIngredient) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    res.status(200).json({ message: 'Ingredient deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting ingredient', error: err.message });
  }
};

module.exports = {
  getAllIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient
};

const mongoose = require('mongoose');
const MealPlan = require('../models/MealPlan');

// GET all meal plans
const getAllMealPlans = async (req, res) => {
  try {
    const mealPlans = await MealPlan.find();
    res.status(200).json(mealPlans);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving meal plans', error: err.message });
  }
};

// GET single meal plan by id
const getMealPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid meal plan id' });
    }

    const mealPlan = await MealPlan.findById(id);
    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    res.status(200).json(mealPlan);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving meal plan', error: err.message });
  }
};

// POST create a new meal plan
const createMealPlan = async (req, res) => {
  try {
    const { title, weekStartDate, userId, recipeIds } = req.body;

    if (!title || !weekStartDate || !userId || !recipeIds) {
      return res
        .status(400)
        .json({ message: 'title, weekStartDate, userId, and recipeIds are all required' });
    }

    if (
      !Array.isArray(recipeIds) ||
      recipeIds.length === 0 ||
      recipeIds.some((rid) => !mongoose.Types.ObjectId.isValid(rid))
    ) {
      return res
        .status(400)
        .json({ message: 'recipeIds must be a non-empty array of valid recipe ids' });
    }

    const newMealPlan = new MealPlan({ title, weekStartDate, userId, recipeIds });
    const savedMealPlan = await newMealPlan.save();
    res.status(201).json(savedMealPlan);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: err.message });
    }
    res.status(500).json({ message: 'Error creating meal plan', error: err.message });
  }
};

// PUT update an existing meal plan
const updateMealPlan = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid meal plan id' });
    }

    if (req.body.recipeIds) {
      if (
        !Array.isArray(req.body.recipeIds) ||
        req.body.recipeIds.some((rid) => !mongoose.Types.ObjectId.isValid(rid))
      ) {
        return res.status(400).json({ message: 'recipeIds must be an array of valid recipe ids' });
      }
    }

    const updatedMealPlan = await MealPlan.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedMealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    res.status(200).json(updatedMealPlan);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: err.message });
    }
    res.status(500).json({ message: 'Error updating meal plan', error: err.message });
  }
};

// DELETE a meal plan
const deleteMealPlan = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid meal plan id' });
    }

    const deletedMealPlan = await MealPlan.findByIdAndDelete(id);
    if (!deletedMealPlan) {
      return res.status(404).json({ message: 'Meal plan not found' });
    }

    res.status(200).json({ message: 'Meal plan deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting meal plan', error: err.message });
  }
};

module.exports = {
  getAllMealPlans,
  getMealPlanById,
  createMealPlan,
  updateMealPlan,
  deleteMealPlan
};

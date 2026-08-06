const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    weekStartDate: {
      type: Date,
      required: [true, 'weekStartDate is required']
    },
    userId: {
      type: String,
      required: [true, 'userId is required']
    },
    recipeIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Recipe',
      required: [true, 'recipeIds is required'],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: 'At least one recipeId is required'
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('MealPlan', mealPlanSchema);

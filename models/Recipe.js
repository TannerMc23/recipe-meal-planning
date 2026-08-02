const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    cuisine: {
      type: String,
      required: [true, 'Cuisine is required'],
      trim: true
    },
    prepTime: {
      type: Number,
      required: [true, 'Prep time (in minutes) is required'],
      min: [0, 'Prep time cannot be negative']
    },
    cookTime: {
      type: Number,
      required: [true, 'Cook time (in minutes) is required'],
      min: [0, 'Cook time cannot be negative']
    },
    servings: {
      type: Number,
      required: [true, 'Servings is required'],
      min: [1, 'Servings must be at least 1']
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty is required'],
      enum: {
        values: ['easy', 'medium', 'hard'],
        message: 'Difficulty must be easy, medium, or hard'
      }
    },
    instructions: {
      type: [String],
      required: [true, 'Instructions are required'],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: 'At least one instruction step is required'
      }
    },
    createdBy: {
      type: String,
      required: [true, 'createdBy is required']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recipe', recipeSchema);

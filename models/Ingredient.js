const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['produce', 'dairy', 'protein', 'grain', 'spice', 'condiment', 'other'],
        message: 'Category must be a valid ingredient category'
      }
    },
    unit: {
      type: String,
      required: [true, 'Unit is required'],
      trim: true
    },
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      required: [true, 'recipeId is required']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ingredient', ingredientSchema);

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      required: [true, 'recipeId is required']
    },
    rating: {
      type: Number,
      required: [true, 'rating is required'],
      min: [1, 'rating must be at least 1'],
      max: [5, 'rating cannot be more than 5']
    },
    comment: {
      type: String,
      trim: true
    },
    reviewer: {
      type: String,
      required: [true, 'reviewer is required']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);

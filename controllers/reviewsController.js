const mongoose = require('mongoose');
const Review = require('../models/Review');

// GET all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving reviews', error: err.message });
  }
};

// GET single review by id
const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid review id' });
    }

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving review', error: err.message });
  }
};

// POST create a new review
const createReview = async (req, res) => {
  try {
    const { recipeId, rating, comment, reviewer } = req.body;

    if (!recipeId || rating === undefined || !reviewer) {
      return res.status(400).json({ message: 'recipeId, rating, and reviewer are all required' });
    }

    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).json({ message: 'Invalid recipeId' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'rating must be between 1 and 5' });
    }

    const newReview = new Review({ recipeId, rating, comment, reviewer });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: err.message });
    }
    res.status(500).json({ message: 'Error creating review', error: err.message });
  }
};

// PUT update an existing review
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid review id' });
    }

    if (req.body.recipeId && !mongoose.Types.ObjectId.isValid(req.body.recipeId)) {
      return res.status(400).json({ message: 'Invalid recipeId' });
    }

    if (req.body.rating !== undefined && (req.body.rating < 1 || req.body.rating > 5)) {
      return res.status(400).json({ message: 'rating must be between 1 and 5' });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(updatedReview);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: err.message });
    }
    res.status(500).json({ message: 'Error updating review', error: err.message });
  }
};

// DELETE a review
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid review id' });
    }

    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting review', error: err.message });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
};

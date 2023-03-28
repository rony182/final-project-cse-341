const express = require('express');
const router = express.Router();

const {
  createReview,
  getReview,
  getReviewsByUser,
  getAllReviews,
  updateReview,
  deleteReview,
} = require("../controllers/review");
const {
  createReviewValidator,
  updateReviewValidator,
} = require("../helpers/review");

// Get a review by ID
router.get('/:id', getReview);

// Get all reviews for a user
router.get('/user/:userId', getReviewsByUser);

// Get all reviews
router.get('/', getAllReviews);

// Create a new review
router.post('/', createReviewValidator,  createReview);

// Update a review by ID
router.put('/:id', updateReviewValidator,  updateReview);

// Delete a review by ID
router.delete('/:id', deleteReview);

module.exports = router;

const { validationResult } = require("express-validator");
const Review = require("../models/Review");

// Get a review by ID
const getReview = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  // #swagger.summary = 'Get a review by ID'
  // #swagger.description = 'Endpoint to get a review by ID'
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error,
    });
  }
};

// Get all reviews for a user
const getReviewsByUser = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  // #swagger.summary = 'Get all reviews for a user'
  // #swagger.description = 'Endpoint to get all reviews for a user'
  try {
    const reviews = await Review.find({ userId: req.params.userId });
    res.json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error,
    });
  }
};

const getReviewsByBook = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  // #swagger.summary = 'Get all reviews for a book'
  // #swagger.description = 'Endpoint to get all reviews for a book'
  try {
    const reviews = await Review.find({ bookId: req.params.bookId });
    res.json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error,
    });
  }
};

// Get all reviews
const getAllReviews = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  // #swagger.summary = 'Get all reviews'
  // #swagger.description = 'Endpoint to get all reviews'
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error,
    });
  }
};

// Create a new review
const createReview = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  // #swagger.summary = 'Create a new review'
  // #swagger.description = 'Endpoint to create a new review'
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { userId, bookId, comment, rating } = req.body;
    const review = new Review({ userId, bookId, comment, rating });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error,
    });
  }

  /* #swagger.parameters['Review'] = {
          in: 'body',
          description: 'Review Information',
          required: true,
          schema: { 
            $userId:"5f9f5b5b5b5b5b5b5b5b5b5b",
            $bookId:"5f9f5b5b5b5b5b5b5b5b5b5b",
            $comment:"Lorem Ipsum", 
            $rating:"9", 
          }
        } 
      */
};

// Update a review
const updateReview = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  // #swagger.summary = 'Update a review'
  // #swagger.description = 'Endpoint to update a review'
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    review.comment = req.body.comment;
    review.rating = req.body.rating;
    review.date = req.body.date;

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error,
    });
  }
  /* #swagger.parameters['Review'] = {
          in: 'body',
          description: 'Review Information',
          required: true,
          schema: { 
            $comment:"Lorem Ipsum", 
            $rating:"9", 
            $date:"2020-12-12T00:00:00.000Z",
          }
        } 
      */

  /**
   * @swagger
   * /api/endpoint:
   *   get:
   *     description: Descripción del endpoint
   *     security:
   *       - apiKey: []
   *     responses:
   *       '200':
   *         description: Respuesta exitosa
   */
};

// Delete a review
const deleteReview = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  // #swagger.summary = 'Delete a review'
  // #swagger.description = 'Endpoint to delete a review'
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json({ message: "Review deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error,
    });
  }
};

module.exports = {
  getReview,
  getReviewsByUser,
  getReviewsByBook,
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
};

const { validationResult } = require('express-validator');
const Review = require('../models/Review');

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API for managing reviews
 * /reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     description: Returns a single review based on the ID parameter
 *     tags: 
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the review to get
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Review not found
 */


// Get a review by ID
getReview = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  // #swagger.summary = 'Get a review by ID'
  // #swagger.description = 'Endpoint to get a review by ID'
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    next(error);
  }
};

// Get all reviews for a user
getReviewsByUser = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  // #swagger.summary = 'Get all reviews for a user'
  // #swagger.description = 'Endpoint to get all reviews for a user'
  try {
    const reviews = await Review.find({ userId: req.params.userId });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

// Get all reviews
getAllReviews = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  // #swagger.summary = 'Get all reviews'
  // #swagger.description = 'Endpoint to get all reviews'
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API endpoints for reviews
 */

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review
 *     description: Endpoint to create a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the review
 *                 example: Great book!
 *               body:
 *                 type: string
 *                 description: Content of the review
 *                 example: I really enjoyed reading this book.
 *               author:
 *                 type: string
 *                 description: Name of the reviewer
 *                 example: John Doe
 *               book:
 *                 type: string
 *                 description: ID of the book being reviewed
 *                 example: 6097c7315f5d5e5b5a047ba2
 *     responses:
 *       '201':
 *         description: Created a new review successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       '400':
 *         description: Bad request, missing or invalid fields in the request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

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
    next(error);
  }
};

module.exports = {
  createReview
};


// Update a review
updateReview = async (req, res, next) => {
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
      return res.status(404).json({ error: 'Review not found' });
    }

    review.comment = req.body.comment;
    review.rating = req.body.rating;
    review.date = req.body.date;

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (error) {
    next(error);
  }
};


// Delete a review
deleteReview = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  // #swagger.summary = 'Delete a review'
  // #swagger.description = 'Endpoint to delete a review'
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ message: 'Review deleted' });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getReview,
  getReviewsByUser,
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
};

const { check } = require('express-validator');

const createReviewValidator = [
  check('userId').exists().withMessage('User ID is required'),
  check('bookId').exists().withMessage('Book ID is required'),
  check('comment').exists().withMessage('Comment is required'),
  check('rating')
    .exists().withMessage('Rating is required')
    .isInt({ min: 1, max: 10 }).withMessage('Rating must be a number between 1 and 10'),
  check('date').optional().isDate().withMessage('Date must be a valid date')
];

const updateReviewValidator = [
  check('comment').optional(),
  check('rating')
    .optional()
    .isInt({ min: 1, max: 10 }).withMessage('Rating must be between 1 and 10'),
  check('date').optional().isDate().withMessage('Date must be a valid date')
];

module.exports = {
  createReviewValidator,
  updateReviewValidator
};

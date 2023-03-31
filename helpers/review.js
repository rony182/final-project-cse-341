const { check } = require("express-validator");

const createReviewValidator = [
  check("userId")
    .exists()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("User ID must be a valid MongoDB ObjectID"),
  check("bookId")
    .exists()
    .withMessage("Book ID is required")
    .isMongoId()
    .withMessage("Book ID must be a valid MongoDB ObjectID"),
  check("comment").exists().withMessage("Comment is required"),
  check("rating")
    .exists()
    .withMessage("Rating is required")
    .isInt({ min: 1, max: 10 })
    .withMessage("Rating must be a number between 1 and 10"),
  check("date").optional().isDate().withMessage("Date must be a valid date"),
];

const updateReviewValidator = [
  check("comment").optional(),
  check("rating")
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage("Rating must be between 1 and 10"),
  check("date").optional().isDate().withMessage("Date must be a valid date"),
  check("userId")
    .optional()
    .isMongoId()
    .withMessage("User ID must be a valid MongoDB ObjectID"),
  check("bookId")
    .optional()
    .isMongoId()
    .withMessage("Book ID must be a valid MongoDB ObjectID"),
];

module.exports = {
  createReviewValidator,
  updateReviewValidator,
};

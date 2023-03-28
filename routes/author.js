const express = require('express');
const router = express.Router();

const {
  authorValidationRules,
  authorUpdateValidationRules,
} = require("../helpers/author");

const {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthorById,
  deleteAuthorById
} = require('../controllers/author');

// Create a new author
router.post('/', authorValidationRules(), createAuthor);

// Get all authors
router.get('/', getAllAuthors);

// Get author by ID
router.get('/:id', getAuthorById);

// Update author by ID
router.put('/:id', authorUpdateValidationRules(), updateAuthorById);

// Delete author by ID
router.delete('/:id', deleteAuthorById);

module.exports = router;

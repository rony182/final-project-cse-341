const express = require('express')
const router = express.Router();
const {bookValidator} = require('../helpers/book-valid')

const booksControllers = require('../controllers/book')

router.get('/:id', booksControllers.getBookById)
router.get('/', booksControllers.getBooks)
router.post('/', [bookValidator], booksControllers.createBook)
router.delete('/:id', booksControllers.deleteBook)
router.put('/:id', [bookValidator], booksControllers.updateBook)

module.exports = router;
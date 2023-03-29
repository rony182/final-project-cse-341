const express = require('express')
const router = express.Router();
const {bookValidator} = require('../helpers/book-valid')

const booksControllers = require('../controllers/book')

router.get('/book/:id', booksControllers.getBookById)
router.get('/book', booksControllers.getBooks)
router.post('/book', [bookValidator], booksControllers.createBook)
router.delete('/book/:id', booksControllers.deleteBook)
router.put('/book/:id', [bookValidator], booksControllers.updateBook)

module.exports = router;
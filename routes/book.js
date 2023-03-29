const express = require('express')
const router = express.Router();
const {bookValidator} = require('../helpers/book-valid')
const validateJWT = require('../middlewares/validate-jwt');

const booksControllers = require('../controllers/book')

router.get('/book/:id', booksControllers.getBookById)
router.get('/book', booksControllers.getBooks)
router.post('/book', [bookValidator, validateJWT], booksControllers.createBook)
router.delete('/book/:id',validateJWT, booksControllers.deleteBook)
router.put('/book/:id', [bookValidator, validateJWT], booksControllers.updateBook)

module.exports = router;
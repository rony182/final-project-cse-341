const express = require('express')
const router = express.Router();
const {bookValidator} = require('../helpers/book-valid')
const validateJWT = require('../middlewares/validate-jwt');

const booksControllers = require('../controllers/book')

router.get('/:id', booksControllers.getBookById)
router.get('/', booksControllers.getBooks)
router.post('/', [bookValidator, validateJWT], booksControllers.createBook)
router.delete('/:id',validateJWT, booksControllers.deleteBook)
router.put('/:id', [bookValidator, validateJWT], booksControllers.updateBook)

module.exports = router;
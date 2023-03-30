const express = require('express');
const router = express.Router();
const validateJWT = require('../middlewares/validate-jwt');

const bookRouter = require('./book');

const authRouter = require('./auth');
const swagger = require('./swagger');
const userRouter = require('./user');
const authorRouter = require('./author');
const reviewRouter = require('./review');

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/authors', validateJWT, authorRouter);
router.use('/reviews', validateJWT, reviewRouter);
router.use('/', swagger);
router.use('/books', validateJWT, bookRouter);

module.exports = router;

const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const swagger = require('./swagger');
const userRouter = require('./user');
const authorRouter = require('./author');
const reviewRouter = require('./review');

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/authors', authorRouter);
router.use('/reviews', reviewRouter);
router.use('/', swagger);

module.exports = router;

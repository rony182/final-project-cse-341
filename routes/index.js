const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const swagger = require('./swagger');
const userRouter = require('./user');

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/', swagger);

module.exports = router;

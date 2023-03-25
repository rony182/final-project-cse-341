const { check } = require('express-validator');
const validateFields = require('./validation');
const validateJWT = require('../middlewares/validate-jwt')
const { emailExists, userExistById, isValidRole } = require('./db-validator')
const { hasRole, isAdminRole } = require('../middlewares/validate-roles');

const createUserValidation = [
  validateJWT,
  check('firstName', 'Firstname is required')
    .not()
    .isEmpty()
    .isString()
    .withMessage('Firstname must be a string'),
  check('lastName', 'Lastname is required')
    .not()
    .isEmpty()
    .isString()
    .withMessage('Lastname must be a string'),
  check('email', 'Email is required').isEmail(),
  check('birthday', 'Birthday is required')
    .not()
    .isEmpty()
    .isString()
    .withMessage('Birthday must be a string'),
  check('phone', 'Phone is required')
    .not()
    .isEmpty()
    .isString()
    .withMessage('Phone must be a string'),
  check('address', 'Address is required')
    .not()
    .isEmpty()
    .isString()
    .withMessage('Address must be a string'),
  check('email').custom(emailExists),
  check('role').custom(isValidRole),
  validateFields
];

const updateUserValidation = [
  validateJWT,
  isAdminRole,
  check('id', 'Is not a mongodb id').isMongoId(),
  check('id').custom(userExistById),
  check('firstName', 'Firstname must be a string').optional().isString(),
  check('lastName', 'Lastname must be a string').optional().isString(),
  check('phone', 'Phone must be a string').optional().isString(),
  check('address', 'Address must be a string').optional().isString(),
  check('birthday', 'Birthday must be a string').optional().isString(),
  validateFields
];

const deleteUserValidation = [
  validateJWT,
  isAdminRole,
  check('id', 'Is not a mongodb id').isMongoId(),
  check('id').custom(userExistById),
  validateFields
];

const findOneValidation = [
  validateJWT,
  check('id', 'Is not a mongodb id').isMongoId(),
  validateFields
];

module.exports = { createUserValidation, updateUserValidation, deleteUserValidation, findOneValidation };


const { check } = require('express-validator');
const Author = require('../models/Author');

const authorValidationRules = () => {
  return [
    check("name", "Name is required").notEmpty(),
    check("birthdate", "Birthdate is required").notEmpty(),
    check("nationality", "Nationality is required").notEmpty(),
    check("biography", "Biography is required").notEmpty(),
    check("website").optional().isURL(),
    check("socialMediaLinks").optional().isArray(),
    check("contactInformation").optional().isString(),
    check("name").custom(async (value) => {
      const author = await Author.findOne({ name: value });
      if (author) {
        return Promise.reject("Author name already in use");
      }
    }),
  ];
};

const authorUpdateValidationRules = () => {
    return [
      check('name').optional(),
      check('birthdate').optional(),
      check('nationality').optional(),
      check('biography').optional(),
      check('website').optional().isURL(),
      check('socialMediaLinks').optional().isArray(),
      check('contactInformation').optional().isString(),
      check('name').custom(async (value, { req }) => {
        const author = await Author.findOne({ name: value });
        if (author && author._id.toString() !== req.params.id) {
          return Promise.reject('Author name already in use');
        }
      })
    ]
  }

module.exports = {
  authorValidationRules, authorUpdateValidationRules
};

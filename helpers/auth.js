const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const validateLogin = [
  check("email", "Email is required").isEmail(),
  check("password", "Password is required").not().isEmpty(),
  validateFields,
];

module.exports = validateLogin;

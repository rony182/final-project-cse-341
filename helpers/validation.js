const validateFields = (req= Request, res= Response, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
};


module.exports = validateFields;
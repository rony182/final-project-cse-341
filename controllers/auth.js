const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const generateJWT = require("../helpers/generate-jwt");
const { response, request } = require("express");

const login = async (req = request, res = response) => {
  // #swagger.tags = ['Login']
  // #swagger.summary = 'Endpoint to login a user'
  // #swagger.description = 'Login user'
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User or password are incorrect",
      });
    }

    const validatePassword = bcryptjs.compareSync(password, user.password);

    if (!validatePassword) {
      return res.status(400).json({
        msg: "User or password are incorrect",
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
    });
  }

  /* #swagger.parameters['Product'] = {
        in: 'body',
        description: 'Product Information',
        required: true,
        schema: { 
          $email:"test1@gmail.com", 
          $password:"12345", 
          
        }
      } 
    */
};

module.exports = {
  login,
};

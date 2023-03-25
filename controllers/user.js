const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/User');

const createUser = async (req = request, res= response) => {
    // #swagger.tags = ['Users']
    // #swagger.description = 'Endpoint create a user'
    try {
      const body = req.body;
      const user = new User(body);
  
      const salt = bcryptjs.genSaltSync();
      user.password = bcryptjs.hashSync(body.password, salt);
  
      await user.save();
  
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({
        msg: error
      });
    }
  
    /* #swagger.parameters['User'] = {
          in: 'body',
          description: 'User Information',
          required: true,
          schema: { 
            $firstName:"Alirio", 
            $lastName:"Mieres", 
            $email:"andres@test.com", 
            $password: "$ecretPassword",
            $birthday:"06/19/2000",
            $phone:"1234567890",
            $address:"Calle 123",
            $role:"USER_ROLE"
          }
        } 
      */
  };

  module.exports = {
    createUser
  }
const Role = require('../models/role');
const User = require('../models/user');

 const isValidRole = async (role = '') => {
  const verifyRole = await Role.findOne({ role });
  if (!verifyRole) {
    throw new Error(`Role ${role} not exist in DB`);
  }
};

 const emailExists = async (email) => {
  const validateEmail = await User.findOne({ email });

  if (validateEmail) {
    throw new Error(`Email ${email} already exists`);
  }
};

 const userExistById = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error(`User with ${id} not exists`);
  }
};


module.exports = {
    isValidRole,
    emailExists,
    userExistById
}
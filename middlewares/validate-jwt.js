const jwt = require('jsonwebtoken');
const User = require('../models/User');

const validateJWT = async (req = Request, res= Response, next) => {
  const token = req.header('apiKey');

  if (!token) {
    return res.status(401).json({
      msg: 'No token in the request'
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: 'Token not valid - user not exist in DB'
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log({ error });
    res.status(401).json({
      msg: 'Token not valid'
    });
  }
  
  console.log(token);
};

module.exports = validateJWT;

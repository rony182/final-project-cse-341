const jwt = require('jsonwebtoken');
const User = require('../models/User');

const validateJWT = async (req, res, next) => {
  let token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({
      msg: 'No token in the request'
    });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await User.findById(decoded.uid);

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
};


module.exports = validateJWT;

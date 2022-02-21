require('dotenv').config();
const jwt = require('jsonwebtoken');
const { HTTP_STATUS_CODES } = require('../constants/app.constants');

exports.validateJWT = (req, res, next) => {
  const token = req.get('Authorization');
  if (!token) {
    return res
      .status(HTTP_STATUS_CODES.UNAUTHORIZED)
      .json({ 
        message: 'Please login.',
        isUserLoggedIn: false 
      });
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    console.log(err);
    return res.json({
      message: 'Oops, something went wrong. Please try again later.',
      isUserLoggedIn: false,
    });
  }
  if (!decodedToken) {
    return res
      .status(HTTP_STATUS_CODES.UNAUTHORIZED).json({
      message: 'Invalid token, please login again.',
      isUserLoggedIn: false,
    });
  }
  req.userId = decodedToken.userId;
  next();
};
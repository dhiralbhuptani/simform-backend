const express = require('express');
const { registrationValidation, loginValidation } = require('../middlewares/validation.middleware');
const { validateJWT } = require('../middlewares/auth.middleware');
const { imageUpload } = require('../middlewares/fileUpload.middleware');
const { 
  registerUser, 
  login, 
  getUserDetails, 
  updateUser 
} = require('../controllers/user.controller');

const Router = express.Router();

//** API routes */
Router.post('/register', registrationValidation, registerUser);
Router.post('/login', loginValidation, login);
Router.put(
  '/update-user', 
  validateJWT,
  imageUpload.single('profileImage'), 
  updateUser
);
Router.get('/get-user-details/:userId', getUserDetails);

module.exports = Router;
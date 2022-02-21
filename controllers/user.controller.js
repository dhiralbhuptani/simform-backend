require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const UserModel = require('../models/user.model');
const { HTTP_STATUS_CODES } = require('../constants/app.constants');
const { securePassword } = require('../utils/utils'); 

/**
 * 
 * Register
 * Used to create new user
 * 
 * @param {*} req It contains firstName, lastName, email, and password
 * @param {*} res *
 * 
 * @returns object, it contains statusCode, message
 * 
*/
exports.registerUser = async (req, res) => {
  try {

    const { firstName, lastName, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email: email }).lean(true);

    if (existingUser) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
        message: 'Email address already in use, please use another email address.',
      });
    }

    const hashedPassword = await securePassword(password);
  
      await UserModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
      });
  
      return res.status(HTTP_STATUS_CODES.CREATED).json({
        statusCode: HTTP_STATUS_CODES.CREATED,
        message: 'User created successfully!',
      });

  } catch (error) {
    console.log(`${chalk.gray('Error at user.controller/register')} ${chalk.red(error)}`);
    return res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({
      statusCode: HTTP_STATUS_CODES.SERVER_ERROR,
      message: 'Oops, something went wrong. Please try again later.',
    });
  }
};

/**
 * 
 * Login
 * Used to Login user
 * 
 * @param {*} req It contains email, and password
 * @param {*} res *
 * 
 * @returns object, it contains statusCode, message, token, and userId
 * 
*/
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
        message: 'User does not exist. Please register!',
        token: null,
        userId: null
      });
    } 

    const isEqual = bcryptjs.compare(password, user.password);
    
    if (!isEqual) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
        message: 'Password does not match!',
        token: null,
        userId: null
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id
      },
      process.env.JWT_SECRET_KEY,
      { 
        expiresIn: process.env.JWT_TOKEN_EXPIRE_TIME 
      }
    );

    return res.status(HTTP_STATUS_CODES.SUCCESS).json({
      statusCode: HTTP_STATUS_CODES.SUCCESS,
      message: 'User logged in successfully!',
      token: token,
      userId: user._id
    });

  } catch (error) {
    console.log(`${chalk.gray('Error at user.controller/login')} ${chalk.red(error)}`);
    return res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({
      statusCode: HTTP_STATUS_CODES.SERVER_ERROR,
      message: 'Oops, something went wrong. Please try again later.',
    });
  }
};

/**
 * 
 * get user info
 * 
 * @param {*} req It contains userId
 * @param {*} res *
 * 
 * @returns object, it contains statusCode, message, user details
 * 
*/
exports.getUserDetails = async (req, res) => {
  try {

    const { userId } = req.params;

    const userDetails = await UserModel.findOne({
      _id: mongoose.Types.ObjectId(userId)
    })
    // .select('firstName lastName email profileImage');

    return res.status(HTTP_STATUS_CODES.SUCCESS).json({
      statusCode: HTTP_STATUS_CODES.SUCCESS,
      message: 'User details fetched successfully!',
      data: userDetails
    });

  } catch (error) {
    console.log(`${chalk.gray('Error at user.controller/getUserDetails')} ${chalk.red(error)}`);
    return res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({
      statusCode: HTTP_STATUS_CODES.SERVER_ERROR,
      message: 'Oops, something went wrong. Please try again later.',
    });
  }
};

/**
 * 
 * Update user
 * Used to update user's details
 * 
 * @param {*} req It contains firstName OR lastName OR profileImage OR password
 * @param {*} res *
 * 
 * @returns object, it contains statusCode, message, updated details
 * 
*/
exports.updateUser = async (req, res) => {
  try {

    const { firstName, lastName, email, password } = req.body;    
    
    let hashedPassword;
    if (password) {
      hashedPassword = await securePassword(password);
    }

    let profileImagePath;
    if (req.file) {
      profileImagePath = path.join(
        __dirname,
        '../uploads',
        req.userId + '_' + req.file.fieldname + path.extname(req.file.originalname)
      );
    }

    const updatedData = {
      firstName, 
      lastName,
      email,
      profileImage: profileImagePath,
      password: hashedPassword
    }

    const isUpdated = await UserModel.findOneAndUpdate({
      _id: mongoose.Types.ObjectId(req.userId)
    }, updatedData);

    if (!isUpdated) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
        message: 'User details cannot be updated!',        
      });
    }

    return res.status(HTTP_STATUS_CODES.SUCCESS).json({
      statusCode: HTTP_STATUS_CODES.SUCCESS,
      message: 'User details updated successfully!',
      data: {
        firstName: updatedData.firstName, 
        lastName: updatedData.lastName,
        email: updatedData.email,
        profileImage: updatedData.profileImage,
      },
    });

  } catch (error) {
    console.log(`${chalk.gray('Error at user.controller/updateUser')} ${chalk.red(error)}`);
    return res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({
      statusCode: HTTP_STATUS_CODES.SERVER_ERROR,
      message: 'Oops, something went wrong. Please try again later.',
    });
  }
};

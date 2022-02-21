const { registrationValidator, loginValidator } = require("../models/user.validation");
const { HTTP_STATUS_CODES } = require('../constants/app.constants');

exports.registrationValidation = async (req, res, next) => {
	const payload = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password,
	};

	const { error } = registrationValidator.validate(payload);
	if (error) {
		return res.status(HTTP_STATUS_CODES.VALIDATION_ERROR).json({
      message: error.message
    });
	}
  next();
};

exports.loginValidation = async (req, res, next) => {
	const payload = {		
		email: req.body.email,
		password: req.body.password,
	};

	const { error } = loginValidator.validate(payload);
	if (error) {
		return res.status(HTTP_STATUS_CODES.VALIDATION_ERROR).json({
      message: error.message
    });
	}
  next();
};

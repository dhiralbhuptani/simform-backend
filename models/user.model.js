const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,    
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profileImage: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: true,
  }
},
{ timestamps: true }
);

mongoose.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
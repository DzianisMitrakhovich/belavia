const mongoose = require('mongoose');

// User Schema

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = module.exports = mongoose.model('User', userSchema);

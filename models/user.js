const mongoose = require('mongoose');
const challengeSchema = require('./challenges');

const userSchema = new mongoose.Schema({
  googleId: String,
  redditId: String,
  name: { type: String, required: true },
  gender: { type: String },
  emails: [{ value: String }],
  picture: { type: String },
  challenges: {
    type: [challengeSchema],
  },
});

const User = mongoose.model('user', userSchema);

module.exports = User;

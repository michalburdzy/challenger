const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  redditId: String,
  name: { type: String, required: true },
  gender: { type: String },
  emails: [{ value: String }],
  picture: { type: String },
});

const User = mongoose.model('user', userSchema);

module.exports = User;

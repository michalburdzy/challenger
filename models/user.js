const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  givenName: { type: String, required: true },
  familyName: { type: String, required: true },
  gender: { type: String },
  emails: [{ value: String }],
  picture: { type: String },
});

const User = mongoose.model('user', userSchema);

module.exports = User;

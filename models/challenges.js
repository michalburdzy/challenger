const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: Number,
});

module.exports = challengeSchema;

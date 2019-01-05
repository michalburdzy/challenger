const mongoose = require('mongoose');
const ChallengeDaySchema = require('./challengeDay');

const challengeSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, required: true},
	title: { type: String, required: true },
	description: String,
	starting: {type: Date, default: Date.now, required: true},
	ending: {type: Date, required: true},
	days: [ChallengeDaySchema]
}, {
	timestamps: true,
});

const Challenge = mongoose.model('challenge', challengeSchema);

module.exports = Challenge;

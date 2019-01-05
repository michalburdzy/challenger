const mongoose = require('mongoose');

const challengeDaySchema = new mongoose.Schema({
	title: { type: String, required: true },
	created: {type: Date, default: Date.now},
	dayNumber: Number,
	challengeCompleted: {type: Boolean, required: true},
	notes: String,
});

module.exports = challengeDaySchema;

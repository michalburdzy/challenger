const mongoose = require('mongoose');
	
const userSchema = new mongoose.Schema({
	googleId: String,
	redditId: String,
	name: { type: String, required: true },
	username: String,
	gender: { type: String },
	emails: [{ value: String }],
	picture: { type: String },
	challenges: {
		type: [mongoose.Schema.Types.ObjectId],
	},
}, {
	timestamps: true,
});

const User = mongoose.model('user', userSchema);

module.exports = User;

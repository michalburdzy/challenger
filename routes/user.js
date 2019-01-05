const logger = require('../services/winston');
const requireLogin = require('../middleware/requireLogin');
const Challenge = require('../models/challenge');


module.exports = (app) => {
	app.get('/api/current_user', (req, res) => {
		res.json({user: req.user});
	});
  
	app.post('/api/current_user', requireLogin, (req, res) => {
		if(!req.user){
			return res.status(401).json({
				error: 'User not logged in'
			});
		}
		const {username} = req.body;
		req.user.updateOne({username});
		return res.redirect('/');
	});
  
	app.get('/api/current_user/challenges', requireLogin, (req, res) => {
		const challenges = Challenge.find({user: req.user._id});
		logger.info(challenges);
		res.json(challenges);
	});

	app.post('/api/current_user/challenges', requireLogin, async (req, res) => {
		const ending = new Date();
		const user = req.user._id;
		const {title} = req.body;
		const newChallenge = await Challenge.create({user, title, ending});
		logger.info(newChallenge);
		const updatedUser = req.user.challenges.push(newChallenge._id);
		await updatedUser.save();
		logger.info(updatedUser);
		res.redirect('/challenges');
		res.json('OKI MAROKI');
	});
};


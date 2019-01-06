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
  
	app.get('/api/current_user/challenges', requireLogin, async (req, res) => {
		const challenges = await Challenge.find({user: req.user._id});
		res.json(challenges);
	});

	app.post('/api/current_user/challenges', requireLogin, async (req, res) => {
		const currUser = req.user;
		const ending = new Date();
		const user = currUser._id;
		const {title} = req.body;
		const newChallenge = await Challenge.create({user, title, ending});
		await currUser.updateOne({$push: {challenges: newChallenge._id}});
		res.redirect('/challenges');
	});
};


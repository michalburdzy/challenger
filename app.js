const express = require('express');
const passport = require('passport');
// const Strategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const logger = require('./services/winston');
const { cookieKey } = require('./config/keys');
const { User } = require('./models');

const PORT = process.env.PORT || 5000;

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((usr) => {
		done(null, usr);
	});
});
const app = express();
require('./services/passport')();

app.use(bodyParser.json());
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: cookieKey, resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes/google')(app);
require('./routes/authRoutes/reddit')(app);
require('./routes/user')(app);

app.get('/', (req, res) => {
	res.send(`User: ${req.user},
  cookiesUser: ${req.session.passport}`);
});

app.get('/api/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

app.get('/privacy', (req, res) => {
	res.render('privacy');
});

app.listen(PORT, () => {
	logger.info(`Server listening on port ${PORT}`);
});

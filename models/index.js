const mongoose = require('mongoose');
const { dbURI } = require('../config/keys/');
const logger = require('../services/winston');

mongoose.connect(
	dbURI,
	{ useNewUrlParser: true },
	(err) => {
		if (err) {
			logger.error(err);
			throw err;
		}
	},
);

mongoose.connection.on('connected', () => {
	logger.info('Mongoose default connection open');
});

mongoose.connection.on('error', (err) => {
	logger.error(`Mongoose default connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
	logger.error('Mongoose default connection disconnected');
});

process.on('SIGINT', () => {
	mongoose.connection.close(() => {
		logger.error(
			'Mongoose default connection disconnected through app termination',
		);
		process.exit(0);
	});
});

module.exports.User = require('./user');

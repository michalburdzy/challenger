const mongoose = require('mongoose');
const { dbURI } = require('../config/keys/');

mongoose.connect(
  dbURI,
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      throw err;
    }
  },
);

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open');
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      'Mongoose default connection disconnected through app termination',
    );
    process.exit(0);
  });
});

module.exports.User = require('./user');

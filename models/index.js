const mongoose = require('mongoose');
const { dbURI } = require('../keys/');
mongoose.connect(
  dbURI,
  { useNewUrlParser: true },
  err => {
    if (err) {
      throw err;
    }
  }
);

mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open');
});

mongoose.connection.on('error', function(err) {
  console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log(
      'Mongoose default connection disconnected through app termination'
    );
    process.exit(0);
  });
});

module.exports.User = require('./user');

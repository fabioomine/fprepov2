const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fitpay');
mongoose.Promise = global.Promise;

module.exports = mongoose;

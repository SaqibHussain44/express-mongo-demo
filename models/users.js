var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var usersSchema = new mongoose.Schema({
  firstName: String,
  age: Number,
  lastName: String,
  password: String,
  email: String
},{ strict: false });

module.exports = mongoose.model('users', usersSchema);

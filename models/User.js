var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _MyUser = mongoose.Schema({
    name: String
});
var User = mongoose.model('MyUser',_MyUser);
/* global db */
module.exports = User;
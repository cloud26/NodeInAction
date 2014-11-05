/* 
* @Author: cloud26
* @Date:   2014-11-04 00:09:00
* @Last Modified by:   cloud26
* @Last Modified time: 2014-11-05 17:36:00
*/

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/shoutbox_app');

var UserSchema = new mongoose.Schema({
	name: String,
	pass: String,
	salt: String
});

module.exports = mongoose.model('User', UserSchema);

/* 
* @Author: cloud26
* @Date:   2014-11-04 00:09:00
* @Last Modified by:   cloud26
* @Last Modified time: 2014-11-04 00:42:05
*/
/*
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/shoutbox_app');
module.exports = User;

function User(obj){
	for(var key in obj) {
		this[key] = obj[key];
	}
}

User.prototype.save = function(next){
	if (this.id){
		this.update(next);
	} else {
		var user = this;
		user.hashPassword(function(err){
			user.save();
		});
	}
}

User.prototype.update = function(next){
	var user = this;

}

User.prototype.hashPassword = function(next){
	var user = this;
	bcrypt.genSalt(12, function(err, salt){
		if(err)	return next(err);
		user.salt = salt;
		bcrypt.hash(user.password, salt, function(err, hash){
			if(err)	return next(err);
			user.password = hash;
			next();
		});
	});
}
*/
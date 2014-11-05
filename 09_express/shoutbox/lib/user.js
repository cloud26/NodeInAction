/* 
* @Author: cloud26
* @Date:   2014-11-04 00:09:00
* @Last Modified by:   cloud26
* @Last Modified time: 2014-11-05 14:25:50
*/

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/shoutbox_app');

var UserSchema = new mongoose.Schema({
	name: String,
	pass: String,
	salt: String
});

//module.exports = mongoose.model('User', User);

mongoose.model('User', UserSchema);
var User = mongoose.model('User');
User.prototype.hashPassword = function(next){
	var user = this;
	bcrypt.genSalt(12, function(err, salt){
		if(err)	return next(err);
		user.salt = salt;
		bcrypt.hash(user.pass, salt, function(err, hash){
			if(err)	return next(err);
			user.pass = hash;
			next();
		}); 
	});
};

var tobi = new User();
tobi.name = 'tom';
tobi.pass = 'tom';
/*
tobi.hashPassword(function(err){
	if(err)	throw err;
	tobi.save(function(err){
		if(err) throw err;
		console.log('User saved');
		console.log(tobi.name);
		console.log(tobi.pass);
		console.log(tobi.salt);
	});
});
*/

function authenticate(name, pass, next){
	User.findOne({'name': name}, function(err, user){
		if(err)	next(err);
		if(!user.id)	return next();
		bcrypt.hash(pass, user.salt, function(err, hash){
			if(err)	return next(err);
			if(hash == user.pass)
				return next(null, user);
			next();
		});
	});
};
//
authenticate('tom', 'xx', function(err, user){
	if(err)	throw err;
	if(!user)	
		console.log('User not exists!');
	else {
		console.log(user.name);
		console.log(user.salt);
	}
});
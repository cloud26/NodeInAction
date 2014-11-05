/* 
* @Author: cloud26
* @Date:   2014-11-04 00:09:00
* @Last Modified by:   cloud26
* @Last Modified time: 2014-11-05 21:27:15
*/

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = require('../models/User');


function hashPassword(user, next){
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

exports.getByName = function(name, next){
	User.findOne({'name': name}, function(err, user){
		if(err)	return next(err);
		next(null, user);
	});
}


exports.authenticate = function(name, pass, next){
	User.findOne({'name': name}, function(err, user){
		if(err)	return next(err);
		if(user == null)	return next();
		bcrypt.hash(pass, user.salt, function(err, hash){
			if(hash == user.pass)
				return next(null, user);
			else
				return next();
		});
	});
};

exports.register = function(name, pass, next){
	var user = new User();
	user.name = name;
	user.pass = pass;
	hashPassword(user, function(err){
		if(err)	return next(err);
		user.save(function(err){
			if(err) return next(err);
			next(null, user);
		});
	});		
};


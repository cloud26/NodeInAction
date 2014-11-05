/* 
* @Author: cloud26
* @Date:   2014-11-04 00:09:00
* @Last Modified by:   cloud26
* @Last Modified time: 2014-11-05 18:08:53
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
exports.register = function(name, pass, next){
	var user = new User();
	user.name = name;
	user.pass = pass;
	hashPassword(user, function(err){
		if(err)	next(err);
		user.save(function(err){
			if(err) next(err);
			console.log('User saved');
		});
	});
};


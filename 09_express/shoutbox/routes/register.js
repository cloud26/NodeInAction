/* 
* @Author: cloud26
* @Date:   2014-11-05 16:44:44
* @Last Modified by:   cloud26
* @Last Modified time: 2014-11-05 21:50:29
*/

var express = require('express');
var router = express.Router();
var userservice = require('../lib/userservice');
/* GET register. */
router.get('/register', function(req, res) {
	res.render('register', {'title': 'Register'});
});

/* POST register. */
router.post('/register', function(req, res, next){
	
	var name = req.body.user.name;
	var pass = req.body.user.pass;
	userservice.getByName(name, function(err, user){
		if(err)	return next(err);
		if(user != null) {
			res.error("User already taken!");
			console.log("User already taken!");
			res.redirect('back');
		}else{
			userservice.register(name, pass, function(err, user){
				if(err) return next(err);
				req.session.uid = user.id;
				res.redirect('/');
			});
		}
	});
});

module.exports = router;
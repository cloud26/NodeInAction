/* 
* @Author: cloud26
* @Date:   2014-11-05 21:03:36
* @Last Modified by:   cloud26
* @Last Modified time: 2014-11-05 21:52:13
*/

var express = require('express');
var router = express.Router();
var userservice = require('../lib/userservice');
/* GET login. */
router.get('/login', function(req, res) {
	res.render('login', {'title': 'Login'});
});

/* GET logout. */
router.get('/logout', function(req, res){
	req.session.destroy(function(err){
		if(err)	throw err;
		res.redirect('/');
	});
});

/* POST login. */
router.post('/login', function(req, res, next){
	var name = req.body.user.name;
	var pass = req.body.user.pass;
	userservice.authenticate(name, pass, function(err, user){
		if(err)	return next(err);
		if(user != null) {
			req.session.uid = user.id;
			res.redirect('/');
		} else {
			res.error("Sorry! Invalid credentials.");
			res.redirect('back');
		}
	});
});

module.exports = router;
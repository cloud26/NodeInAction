/* 
* @Author: cloud26
* @Date:   2014-11-05 16:44:44
* @Last Modified by:   cloud26
* @Last Modified time: 2014-11-05 18:01:41
*/

var express = require('express');
var router = express.Router();
var userservice = require('../lib/userservice');
/* GET register. */
router.get('/', function(req, res) {
  res.render('register', {'title': 'Register'});
});

/* POST register. */
router.post('/', function(req, res, next){
	//console.log(req.body.user);
	//var name = req.body.user.name;
	//var pass = req.body.user.pass;
	var name = 'admin';
	var pass = 'pass';
	userservice.register(name, pass, function(err){
		//if(err) console.log(err);
		console.log("register");
	});
});

module.exports = router;
/* 
* @Author: cloud26
* @Date:   2014-11-05 21:33:29
* @Last Modified by:   cloud26
* @Last Modified time: 2014-11-05 21:53:52
*/
var User = require('../../models/User');

module.exports = function(req, res, next){
	var uid = req.session.uid;
	if(!uid)	return next();
	User.findOne({'_id': uid}, function(err, user){
		if(err)	return next(err);
		req.user = res.locals.user = user;
		next();
	});
};
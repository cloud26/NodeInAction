/* 
* @Author: linpp
* @Date:   2014-11-03 19:39:45
* @Last Modified by:   cloud26
* @Last Modified time: 2014-11-03 22:11:13
*/

var photos = [];
photos.push({
	name: 'Node.js Logo',
	path: 'http://nodejs.org/images/logos/nodejs-green.png'
});
photos.push({
	name: 'Ryan Speaking',
	path: 'http://nodejs.org/images/ryan-speaker.jpg'
});

var Photo = require('../models/Photo');
var path = require('path');
var fs = require('fs');
var join = path.join;

exports.list = function(req, res, next){
	Photo.find({}, function(err, photos){
		if(err)	return next(err);
		res.render('photos', {
			title: 'Photos',
			photos: photos
		});
	});
};

exports.form = function(req, res){
	res.render('photos/upload', {
		title: "Photo upload"
	});
};

exports.submit = function(dir){
	return function(req, res, next) {
		var img = req.files.photo.image;
		var name = req.body.photo.name || img.name;
		var path = join(dir, img.name);
		fs.rename(img.path, path, function(err){
			if(err)	return next(err);
			Photo.create({
				name: name,
				path: img.name
			}, function(err){
				if(err)	return next(err);
				res.redirect('/');
			});
		});
	};
};

exports.download = function(dir){
	return function(req, res, next){
		var id = req.params.id;
		//var idx = req.params.idx;
		//console.log(idx);
		Photo.findById(id, function(err, photo){
			if(err) return next(err);
			var path = join(dir, photo.path);
			res.download(path);
		});
	};
};
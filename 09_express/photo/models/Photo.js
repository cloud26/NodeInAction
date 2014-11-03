/* 
* @Author: linpp
* @Date:   2014-11-03 20:43:43
* @Last Modified by:   linpp
* @Last Modified time: 2014-11-03 21:18:19
*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photo_app');
var schema = new mongoose.Schema({
	name: String,
	path: String
});

module.exports = mongoose.model('Photo', schema);
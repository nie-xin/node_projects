var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

module.exports.mongoose = mongoose;
module.exports.Schema   = Schema;

// connect to cloud db
var username = "niexin";
var password = "xinxin1982";
var address  = '@ds053948.mongolab.com:53948/node';
connect();

// connect to mongo
function connect() {
	var url = 'mongodb://' + username + ':' + password + address;
	mongoose.connect(url);
}

function disconnect() {
	mongoose.disconnect();
}

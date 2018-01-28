var mongo = require('mongodb').MongoClient;
var Q = require('q');

var BASE_URL = 'localhost' + ':' + '27017';
var COMPLETE_URL = "mongodb://" + BASE_URL + "/blogdb";
var database = {
	url : COMPLETE_URL,
	conn : null
}
database.getConnection = function(filename, enc){
	var deferred = Q.defer();
	if (database.conn){
	    deferred.resolve(database.conn);
	}else {
      	mongo.connect(database.url, function(err, db){
      		if(err){
      			deferred.reject(err);
      		}
      		else{
      			console.log("first connection established");
      			database.conn = db;
      			deferred.resolve(database.db);
      		}
      	});
	} 
    return deferred.promise;
	
}

module.exports = database;


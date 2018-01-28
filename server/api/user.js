var express = require('express');
var cookieParser = require('cookie-parser'); 
var bodyParser = require('body-parser'); 

var database = require('./db'); 

console.log("database", database)	

var user = express.Router();

user.use(bodyParser.json());

user.use(cookieParser());	 

user.route('/auth')
	// Get all blogs
	.post(function(req, res, next){
		console.log("req.body.username", req.body);
		database.getConnection().then(function success(db){
			console.log("already connectd");
			var conn = db.collection("userotp");
			conn.findOne({'user': req.body.username, 'otp': req.body.password}, function(err, data){
				console.log(data);
				if(err){
					console.log("inside error");
					res.status(403).send('error')
				}else{
					if(data){
						res.cookie('auth', 'true'); 
						res.send(data);
					}else{
						res.status(403).send('error');
					}
					
				}
				
			})
		}, function error(error){
			console.log("conection error");
			res.status(500).send('conection error');
		})
		
	})

	.get(function(req, res){
		if(req.cookies.auth){
			res.clearCookie('auth');
			res.send("Successfully Logged out");
		}else{
			res.status(401).send("Not Logged In");
		}
	})

module.exports = user;
var express = require('express');
var cookieParser = require('cookie-parser'); 
var bodyParser = require('body-parser'); 
var ObjectId = require('mongodb').ObjectID;
var  fs = require('fs');
var FormData = require('form-data');
const fileUpload = require('express-fileupload');
const util = require('util');

var database = require('./db'); 

var blogRouter = express.Router();

blogRouter.use(bodyParser.json()); 

blogRouter.use(cookieParser());	

blogRouter.use(fileUpload());

blogRouter.route('/list')
	// Get all blogs
	.get(function(req, res){
		console.log("1");
		database.getConnection().then(function success(db){
			var conn = db.collection("blog");
			conn.find({}).toArray(function(err, data){
				res.send(data);
			})
		}, function error(error){
			console.log("conection error");
			res.status(500).send('conection error');
		})
	})
	
	// Post a blog
blogRouter.route('/post/')
	.post(function(req, res, next){
		var data  = JSON.parse(req.body.info);
		console.log("data", data);
		if(req.cookies.auth){
			database.getConnection().then(function success(db){
				var conn = db.collection("blog");
				console.log("data", data);
				conn.insert(data, function(err, result){
					if(err){
						res.status(500).send("post failed");
					}
					else{
						if (!req.files){
							return res.status(400).send('No files were uploaded.');
						}
						var sampleFile = req.files.upload;
						console.log("sampleFile", sampleFile);
						console.log("result", result.ops[0]._id);
						var filename =result.ops[0]._id + '.jpg';
						console.log("filename", filename);
						sampleFile.mv('./server/api/images/' + filename, function(err) {
						    if(err)
						    {
						      	console.log('error')
						      	return res.status(500).send(err);
						    }
						    console.log("yipee")
						    res.send('File uploaded!');
						});
					}
				},function error(error){
					console.log("insertion error");
					res.status(500).send('insertion error');
				})
			}, function error(error){
				console.log("conection error");
				res.status(500).send('conection error');
			})
		}else{
			res.status(403).send("login required");
		}
		
	})


blogRouter.route('/getDetail/:id')
	// Get a blog by ID
	.get(function(req, res){
		console.log(req.params);
		database.getConnection().then(function success(db){
			var conn = db.collection("blog");
			conn.findOne({_id : ObjectId(req.params['id'])}, function(err, data){
				if(err){
					res.status(500).send('error')
				}else{
					if(data){
						var filename  = req.params['id'] + '.jpg';
						var bitmap = fs.readFileSync(__dirname + "/images/" + filename);
					 	var dataObj  = new Buffer(bitmap).toString('base64');
						data.image = dataObj;
						res.send(data); 
					}else{
						res.status(500).send('error');
					}	
				}	
			})
			
		}, function error(error){
			console.log("conection error");
			res.status(500).send('conection error');
		})
	})
	

module.exports = blogRouter;
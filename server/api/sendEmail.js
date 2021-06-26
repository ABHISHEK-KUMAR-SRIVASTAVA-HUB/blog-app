
var express = require('express');
var cookieParser = require('cookie-parser'); 
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser'); 
var url = "mongodb://localhost:27018/blogdb";
var sendMail = express.Router();

var database = require('./db'); 


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
   	user: '*********',
        pass: '*********'
  }
});

var mailOptions = {
  from: 'sriabhishek.srivastava@example.com',
  to: 'abhishek2.srivastava@airtel.com',
  subject: 'Verify yourself',
  text: 'That was easy!'
};
	

sendMail.use(bodyParser.json());

sendMail.use(cookieParser());	 

sendMail.route('/sendOTP')
	.post(function(req, res, next){
		console.log("req.body.username", req.body);
		database.getConnection().then(function success(db){
			var conn = db.collection("userotp");
			var otp = Math.floor(1000 + Math.random() * 9000)
			console.log("otp", otp);
			var data = {
				'otp' : otp,
				'user': req.body.username,
				'sentDate' : new Date()
			}
			conn.insert(data, function(err, result){
				if(err){
					res.status(500).send("post failed");
				}
				else{
					
					mailOptions.text = 'Verification code is ' + otp;
					mailOptions.to =  req.body.username;
					transporter.sendMail(mailOptions, function(error, info){
					  if (error) {
					    console.log(error);
					  } else {
					   res.send("otp in table created and mail sent");
					  }
					});
				}
					
			})
			
		}, function error(error){
			console.log("conection error");
			res.status(500).send('conection error');
		})
	})

module.exports = sendMail;

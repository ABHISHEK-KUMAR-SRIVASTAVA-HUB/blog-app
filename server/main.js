var express = require('express');
var blog = require('./server/api/blog');
var user = require('./server/api/user');
var path  = require('path');

var app  = new express();

app.use('/blog', blog);
app.use('/user', user);
app.use('/OTP', sendEmail)

console.log("i am running")
var indexPath = path.join(__dirname, './public/app');
app.use(express.static(indexPath));

app.listen(80);
      
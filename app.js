var express = require('express');
var bodyParser = require('body-parser')
//var anyBody = require("body/any")
//var path = require('path');
//var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');

var app = express();

app.use(bodyParser.text({type: '*/*'}));
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('*', indexRouter);

module.exports = app;

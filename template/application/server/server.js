'use strict';
// Set default node environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var gutil = require('gulp-util');
var express = require('express');

var ip = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || undefined;
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 9000;


// Setup server
var app = express();
var server = require('http').createServer(app);

// Handlers
app.route('/').get(function (req, res) {
    res.render('index');
});

// Start server
server.listen(port, ip, function () {
    gutil.log('Server API listening on %d, in %s mode', port, gutil.colors.green(app.get('env')));
});
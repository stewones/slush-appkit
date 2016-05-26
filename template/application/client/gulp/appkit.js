'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;
var args = require('yargs').argv;
var ngConstant = require('gulp-angular-constant');
var rename = require("gulp-rename");
var path = require('path');
var conf = require('./conf');
var browserSync = require('browser-sync');
var _ = require('lodash');


gulp.task('appkit', ['enviroment', 'settings']);
//enviroment config constants
gulp.task('enviroment', function() {
    var config = require('../../appkit.json');
    var env = args.env || 'development';
    var envConfig = config.environment[env];
    return ngConstant({
        name: 'app.env',
        constants: envConfig,
        stream: true
    }).pipe($.uglify({
        preserveComments: $.uglifySaveLicense
    })).pipe(rename('app.env.constant.js')).pipe(gulp.dest('./src/app/constants'));
});

//app settings constants
gulp.task('settings', function() {
    var config = require('../../appkit.json');
    return ngConstant({
        name: 'app.setting',
        constants: config.application,
        stream: true
    }).pipe($.uglify({
        preserveComments: $.uglifySaveLicense
    })).pipe(rename('app.setting.constant.js')).pipe(gulp.dest('./src/app/constants'));
});
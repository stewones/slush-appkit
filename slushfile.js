/**
 * slush-appkit provides a modular workflow to scaffold and build web applications
 * 
 * Software licensed under MIT, maintained by @stewones. Feel free to open an issue or make a PR.
 * Check out documentation and full list of contributors in http://slush-appkit.stpa.co
 *
 * Copyright © 2014 Stewan Pacheco <talk@stpa.co>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the “Software”), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 **/

'use strict';

var _ = require('lodash'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    inquirer = require('inquirer'),
    colors = require('colors'),
    gutil = require('gulp-util'),
    exec = require('gulp-exec'),
    nodemon = require('nodemon'),
    fs = require('fs'),
    path = require('path');


//load appkit config
try {
    var appkit = require(process.cwd() + '/appkit.json');
    if (appkit) {
        appkit = appkit.application.setting || false;
    } else {
        appkit = {};
    }
}
catch (e) {
    var appkit = {};
    //console.log(e);
}

require('./generator/application')(_, gulp, gulpif, install, conflict, template, rename, inquirer, colors, path, injectAngularModules);
require('./generator/client.module')(_, gulp, install, conflict, template, rename, inquirer, colors, gutil, exec, fs, path, injectAngularModules);
require('./generator/client.controller')(_, gulp, install, conflict, template, rename, inquirer, colors, gutil, exec, fs, path);
require('./generator/client.component')(_, gulp, install, conflict, template, rename, inquirer, colors, gutil, exec, fs, path);
require('./generator/client.serve')(_, gulp, install, conflict, template, rename, inquirer, colors, gutil, exec, fs, path);
require('./generator/api.serve')(_, gulp, gutil, nodemon);
require('./generator/serve')(_, gulp, gutil, nodemon);

function getDirectories(srcpath) {
    try {
        var files = fs.readdirSync(srcpath);

        if (files.length) {
            return files.filter(function (file) {
                return fs.statSync(path.join(srcpath, file)).isDirectory();
            });
        } else {
            return [];
        }

    } catch ($e) {
        return [];
        //   console.log($e)
    }
}

function injectAngularModules(appName) {
    var answers = {};
    var modules = getDirectories(process.cwd() + '/client/src/app/modules');
    answers.modules = modules || [];
    answers.name = appName || appkit.name || 'appkit';
    var inject = [__dirname + '/template/application/client/src/app/app.module.js']; // Note use of __dirname to be relative to generator
    return gulp.src(inject)
        .pipe(template(answers)) // Lodash template support 
        .pipe(conflict('./client/src/app')) // Confirms overwrites on file conflicts
        .pipe(gulp.dest('./client/src/app')) // Without __dirname here = relative to cwd 
        .once('error', function () {
            process.exit(1);
        })
        .once('end', function () {
            console.log('WAT')
            process.exit();
        });
}
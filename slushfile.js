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

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function (file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}

//create new app
gulp.task('default', function (done) {
    inquirer.prompt([
        { type: 'input', name: 'name', message: 'Give your app a name:', default: 'appkit' }, // Get app name from arguments by default
        { type: 'input', name: 'version', message: 'Give version for your app:', default: '0.0.1' },
        { type: 'input', name: 'authorName', message: 'Give an author name for your app:', default: 'bot' },
        { type: 'input', name: 'authorEmail', message: 'Give an author email for your app:', default: 'hello@world.com' },
        { type: 'input', name: 'license', message: 'Give a license for your app:', default: 'MIT' },
        { type: 'confirm', name: 'moveon', message: 'Continue?' }
    ],
        function (answers) {
            if (!answers.moveon) {
                return done();
            }
            answers.nameDashed = _.kebabCase(answers.name);
            answers.nameCamel = _.camelCase(answers.name);
            answers.name = answers.name;
            var inject = [__dirname + '/template/application/**', '!' + __dirname + '/template/application/client/src/app/app.module.js'];
            gulp.src(inject) // Note use of __dirname to be relative to generator
                .pipe(template(answers))                 // Lodash template support
                .pipe(rename(function (path) {
                    if (path.basename[0] === '_') { //rename _ to .
                        path.basename = '.' + path.basename.slice(1);
                    }
                }))
                .pipe(conflict('./'))                    // Confirms overwrites on file conflicts
                .pipe(gulp.dest('./'))                   // Without __dirname here = relative to cwd
                .pipe(install())                         // Run `bower install` and/or `npm install` if necessary
                .on('end', function () {
                    injectAngularModules(answers.name).on('end', function () {
                        done(); // Finished!  
                        setTimeout(function () {
                            console.log('New application successfully created'.green);
                        }, 500);
                    });
                })
                .resume();
        });
});

//create angular module
gulp.task('client-module', function (done) {
    var args = this.args;

    if (!this.args[0]) {
        console.log('#############################################################'.yellow);
        console.log('######   Incorrect usage                               ######'.yellow);
        console.log('######   Try slush appkit:client-module <moduleName>   ######'.yellow);
        console.log('######   Example: `slush appkit:client-module user`    ######'.yellow);
        console.log('#############################################################'.yellow);
        return done();
    }
    inquirer.prompt([
        //{ type: 'input', name: 'module', message: 'What is the module?', default: gulp.args.join(' ') },
        //{ type: 'input', name: 'name', message: 'What is the name of controller?', default: gulp.args.join(' ') },
        { type: 'confirm', name: 'moveon', message: 'Continue?' }
    ],
        function (answers) {
            if (!answers.moveon) {
                return done();
            }
            answers.moduleName = args[0];
            answers.moduleNameStartCase = _.startCase(args[0]);

            var inject = [__dirname + '/template/angular/module/**'];
            gulp.src(inject) // Note use of __dirname to be relative to generator              
                .pipe(template(answers))                 // Lodash template support
                .pipe(rename(function (path) {
                    if (path.extname) {
                        path.basename = answers.moduleName + '.' + path.basename;
                    }
                    if (path.basename[0] === '_') { //rename _ to .
                        path.basename = '.' + path.basename.slice(1);
                    }
                }))
                .pipe(conflict('./client/src/app/modules/' + answers.moduleName))                    // Confirms overwrites on file conflicts            
                .pipe(gulp.dest('./client/src/app/modules/' + answers.moduleName))                   // Without __dirname here = relative to cwd
                .pipe(install())                         // Run `bower install` and/or `npm install` if necessary
                .on('end', function () {
                    injectAngularModules();
                    done(); // Finished!  
                    setTimeout(function () {
                        console.log('Client module successfully created'.green);
                    }, 500);
                })
                .resume();
        });
});

//create angular controller
gulp.task('client-controller', ['client-controller-generator']);
gulp.task('client-ctrl', ['client-controller-generator']);
gulp.task('client-controller-generator', function (done) {
    var args = this.args;
    if (!this.args[0] || !this.args[1]) {
        console.log('###################################################################################'.yellow);
        console.log('######   Incorrect usage                                                     ######'.yellow);
        console.log('######   Try slush appkit:client-controller <moduleName> <controllerName>    ######'.yellow);
        console.log('######   Example: `slush appkit:client-controller user list`                 ######'.yellow);
        console.log('###################################################################################'.yellow);
        return done();
    }
    inquirer.prompt([
        //{ type: 'input', name: 'module', message: 'What is the module?', default: gulp.args.join(' ') },
        //{ type: 'input', name: 'name', message: 'What is the name of controller?', default: gulp.args.join(' ') },
        { type: 'confirm', name: 'moveon', message: 'Continue?' }
    ],
        function (answers) {
            if (!answers.moveon) {
                return done();
            }
            answers.moduleName = args[0];
            answers.controllerName = args[1];
            answers.controllerNameStartcase = _.startCase(answers.controllerName);
            var inject = [__dirname + '/template/angular/controller/**']; // Note use of __dirname to be relative to generator
            gulp.src(inject)
                .pipe(template(answers)) // Lodash template support
                .pipe(rename(function (path) { //rename files
                    if (path.extname) {
                        path.basename = answers.controllerName + '.' + path.basename;
                    }
                    if (path.basename[0] === '_') { //rename _ to .
                        path.basename = '.' + path.basename.slice(1);
                    }
                }))
                .pipe(conflict('./client/src/app/modules/' + answers.moduleName)) // Confirms overwrites on file conflicts
                .pipe(gulp.dest('./client/src/app/modules/' + answers.moduleName)) // Without __dirname here = relative to cwd
                .pipe(install()) // Run `bower install` and/or `npm install` if necessary
                .on('end', function () {
                    done(); // Finished!  
                    setTimeout(function () {
                        console.log('New controller successfully created'.green);
                    }, 500);
                })
                .resume();
        });
});

//create angular component
gulp.task('client-comp', ['client-component-generator']);
gulp.task('client-component', ['client-component-generator']);
gulp.task('client-component-generator', function (done) {
    var args = this.args;
    if (!this.args[0] || !this.args[1]) {
        console.log('#################################################################################'.yellow);
        console.log('######   Incorrect usage                                                   ######'.yellow);
        console.log('######   Try slush appkit:client-component <moduleName> <componentName>    ######'.yellow);
        console.log('######   Example: `slush appkit:client-component user list`                ######'.yellow);
        console.log('#################################################################################'.yellow);
        return done();
    }
    inquirer.prompt([
        //{ type: 'input', name: 'module', message: 'What is the module?', default: gulp.args.join(' ') },
        //{ type: 'input', name: 'name', message: 'What is the name of controller?', default: gulp.args.join(' ') },
        { type: 'confirm', name: 'moveon', message: 'Continue?' }
    ],
        function (answers) {
            if (!answers.moveon) {
                return done();
            }
            answers.moduleName = args[0];
            answers.componentName = args[1];

            var inject = [__dirname + '/template/angular/component/**']; // Note use of __dirname to be relative to generator
            gulp.src(inject)
                .pipe(template(answers)) // Lodash template support               
                .pipe(rename(function (path) { //rename files
                    if (path.extname) {
                        path.basename = answers.componentName + '.' + path.basename;
                    }
                    if (path.basename[0] === '_') { //rename _ to .
                        path.basename = '.' + path.basename.slice(1);
                    }
                }))
                .pipe(conflict('./client/src/app/modules/' + answers.moduleName + '/components/' + answers.componentName)) // Confirms overwrites on file conflicts
                .pipe(gulp.dest('./client/src/app/modules/' + answers.moduleName + '/components/' + answers.componentName)) // Without __dirname here = relative to cwd
                .pipe(install()) // Run `bower install` and/or `npm install` if necessary
                .on('end', function () {
                    done(); // Finished!  
                    setTimeout(function () {
                        console.log('New component successfully created'.green);
                    }, 500);
                })
                .resume();
        });
});

//serve client
gulp.task('serve-client', function (done) {
    gulp.src('./')
        .pipe(exec('cd ./client && gulp serve', function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            console.log(err);
            done(err);
        }));
});

//serve api
gulp.task('serve-api', function () {
    // configure nodemon
    nodemon({
        // the script to run the app
        script: 'server/server.js',
        // this listens to changes in any of these files/routes and restarts the application
        watch: ['server/*/**'],
        ext: 'js'
    }).on('restart', (log) => {
        gutil.log('Modified', gutil.colors.yellow(log))
    }).on('start', (log) => {
        gutil.log('#######################################');
        gutil.log('### Serving API. Wait for client... ###');
        gutil.log('#######################################');
    });
});

//serve all
gulp.task('serve', function () {
    gulp.start('serve-client');
    gulp.start('serve-api');
});


//inject angular 3rd party modules in app.module.js
gulp.task('inject-angular-modules', function (done) {
    injectAngularModules();
});

function injectAngularModules() {
    var appkit = require(process.cwd() + '/appkit.json').application.setting;
    var answers = {};
    var modules = getDirectories('./client/src/app/modules');
    answers.modules = modules || [];
    answers.name = appkit.name || 'appkit';
    var inject = [__dirname + '/template/application/client/src/app/app.module.js']; // Note use of __dirname to be relative to generator
    return gulp.src(inject)
        .pipe(template(answers)) // Lodash template support 
        .pipe(conflict('./client/src/app')) // Confirms overwrites on file conflicts
        .pipe(gulp.dest('./client/src/app')) // Without __dirname here = relative to cwd
        .pipe(install()) // Run `bower install` and/or `npm install` if necessary
        ;
}
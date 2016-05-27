var _ = require('lodash'),
    gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    inquirer = require('inquirer'),
    colors = require('colors'),
    gutil = require('gulp-util'),
    exec = require('gulp-exec');

var nodemon = require('nodemon');

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
            var inject = [__dirname + '/template/application/**', '!' + __dirname + '/template/application/build/**'];
            gulp.src(inject) // Note use of __dirname to be relative to generator
                .pipe(template(answers))                 // Lodash template support
                .pipe(conflict('./'))                    // Confirms overwrites on file conflicts
                .pipe(gulp.dest('./'))                   // Without __dirname here = relative to cwd
                .pipe(install())                         // Run `bower install` and/or `npm install` if necessary
                .on('end', function () {
                    done();                              // Finished!
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

            var inject = [__dirname + '/template/angular/module/**'];
            gulp.src(inject) // Note use of __dirname to be relative to generator              
                .pipe(template(answers))                 // Lodash template support
                .pipe(conflict('./client/src/app/modules/' + answers.moduleName))                    // Confirms overwrites on file conflicts            
                .pipe(gulp.dest('./client/src/app/modules/' + answers.moduleName))                   // Without __dirname here = relative to cwd
                .pipe(install())                         // Run `bower install` and/or `npm install` if necessary
                .on('end', function () {
                    done();                              // Finished!
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
        // { type: 'confirm', name: 'moveon', message: 'Continue?' }
    ],
        function (answers) {
            // if (!answers.moveon) {
            //     return done();
            // }
            answers.moduleName = args[0];
            answers.controllerName = args[1];

            var inject = [__dirname + '/template/angular/controller/**']; // Note use of __dirname to be relative to generator
            gulp.src(inject)
                .pipe(template(answers)) // Lodash template support               
                .pipe(rename(function (path) { //rename files
                    if (path.extname) {
                        path.basename = answers.controllerName + '.' + path.basename;
                    }
                }))
                .pipe(conflict('./client/src/app/modules/' + answers.moduleName)) // Confirms overwrites on file conflicts
                .pipe(gulp.dest('./client/src/app/modules/' + answers.moduleName)) // Without __dirname here = relative to cwd
                .pipe(install()) // Run `bower install` and/or `npm install` if necessary
                .on('end', function () {
                    done(); // Finished!
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
        // { type: 'confirm', name: 'moveon', message: 'Continue?' }
    ],
        function (answers) {
            // if (!answers.moveon) {
            //     return done();
            // }
            answers.moduleName = args[0];
            answers.componentName = args[1];

            var inject = [__dirname + '/template/angular/component/**']; // Note use of __dirname to be relative to generator
            gulp.src(inject)
                .pipe(template(answers)) // Lodash template support               
                .pipe(rename(function (path) { //rename files
                    if (path.extname) {
                        path.basename = answers.componentName + '.' + path.basename;
                    }
                }))
                .pipe(conflict('./client/src/app/modules/' + answers.moduleName + '/components/' + answers.componentName)) // Confirms overwrites on file conflicts
                .pipe(gulp.dest('./client/src/app/modules/' + answers.moduleName + '/components/' + answers.componentName)) // Without __dirname here = relative to cwd
                .pipe(install()) // Run `bower install` and/or `npm install` if necessary
                .on('end', function () {
                    done(); // Finished!
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
    });
});

//serve all
gulp.task('serve', function () {
    gulp.start('serve-client');
    gulp.start('serve-api');
});
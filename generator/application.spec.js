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

/* jshint node:true */
/* global require, it, before, beforeEach, describe */

process.env.NODE_ENV = 'test';

var chai = require('chai'),
    inquirer = require('inquirer'),
    gulp = require('gulp'),
    mockGulpDest = require('mock-gulp-dest')(gulp);

chai.should();

require('../slushfile');

describe('slush-appkit', function () {
    before(function () {
        process.chdir(__dirname);
    });

    describe('default generator', function () {
        beforeEach(function () {
            mockPrompt({ name: 'MyNewApp', moveon: true, install: 'n' });
        });

        it('should put all project files in current working directory', function (done) {
        
                console.log(gulp.start('default').once('stop', function () {
                console.log('AFKL;MNAOFKLNMSFOJANFJK')
                 mockGulpDest.cwd().should.equal(__dirname);
                // mockGulpDest.basePath().should.equal(__dirname);
                done();
            }));
        });

        // it('should add dot files to project root', function (done) {
        //     gulp.start('default').once('stop', function () {
        //         mockGulpDest.assertDestContains([
        //             '.bowerrc',
        //             '.csslintrc',
        //             '.editorconfig',
        //             '.gitignore',
        //             '.jshintrc'
        //         ]);

        //         done();
        //     });
        // });

        // it('should add bower.json and package.json to project root', function (done) {
        //     gulp.start('default').once('stop', function () {
        //         mockGulpDest.assertDestContains([
        //             'package.json',
        //             'bower.json'
        //         ]);

        //         done();
        //     });
        // });

        // it('should add a gulpfile to project root', function (done) {
        //     gulp.start('default').once('stop', function () {
        //         mockGulpDest.assertDestContains('gulpfile.js');
        //         done();
        //     });
        // });

        // it('should add a karma config file to project root', function (done) {
        //     gulp.start('default').once('stop', function () {
        //         mockGulpDest.assertDestContains('karma.conf.js');
        //         done();
        //     });
        // });

        // it('should add a readme file to project root', function (done) {
        //     gulp.start('default').once('stop', function () {
        //         mockGulpDest.assertDestContains('README.md');
        //         done();
        //     });
        // });

        // it('should add an index.html to the app folder', function (done) {
        //     gulp.start('default').once('stop', function () {
        //         mockGulpDest.assertDestContains('src/app/index.html');
        //         done();
        //     });
        // });

        // it('should add a JavaScript app module definition file by default', function (done) {
        //     mockPrompt({ name: 'module', example: false });

        //     gulp.start('default').once('stop', function () {
        //         mockGulpDest.assertDestContains('src/app/app.js');
        //         mockGulpDest.assertDestNotContains('src/app/app.coffee');
        //         done();
        //     });
        // });

        // it('should add a CoffeeScript app module definition file if CoffeeScript is chosen', function (done) {
        //     mockPrompt({ name: 'module', example: false, coffee: true });

        //     gulp.start('default').once('stop', function () {
        //         mockGulpDest.assertDestNotContains('src/app/app.js');
        //         mockGulpDest.assertDestContains('src/app/app.coffee');
        //         done();
        //     });
        // });

        // it('should create a gitkeep file in the app assets dir', function (done) {
        //     gulp.start('default').once('stop', function () {
        //         mockGulpDest.assertDestContains('src/app/assets/.gitkeep');
        //         done();
        //     });
        // });

        // describe('Todo example', function () {
        //     it('should not add any todo example files by default', function (done) {
        //         mockPrompt({ name: 'module', example: false });

        //         gulp.start('default').once('stop', function () {
        //             mockGulpDest.assertDestNotContains({
        //                 'src/app/todo': [
        //                     'todo.html',
        //                     'todo.js',
        //                     'todo-controller.js',
        //                     'todo-controller_test.js',
        //                     'todo.coffee',
        //                     'todo-controller.coffee',
        //                     'todo-controller_test.coffee',
        //                     'todo.styl',
        //                     'todo.less',
        //                     'todo.scss'
        //                 ]
        //             });
        //             done();
        //         });
        //     });

        //     describe('When Todo example is included', function () {
        //         beforeEach(function () {
        //             mockPrompt({ name: 'module', example: true });
        //         });

        //         it('should add a module specific template', function (done) {
        //             gulp.start('default').once('stop', function () {
        //                 mockGulpDest.assertDestContains('src/app/todo/todo.html');
        //                 done();
        //             });
        //         });

        //         it('should add a module definition file for the Todo module', function (done) {
        //             gulp.start('default').once('stop', function () {
        //                 mockGulpDest.assertDestContains('src/app/todo/todo.js');
        //                 done();
        //             });
        //         });

        //         it('should add a Todo controller with a corresponding test file', function (done) {
        //             gulp.start('default').once('stop', function () {
        //                 mockGulpDest.assertDestContains([
        //                     'src/app/todo/todo-controller.js',
        //                     'src/app/todo/todo-controller_test.js'
        //                 ]);
        //                 done();
        //             });
        //         });

        //         describe('When CoffeeScript is chosen', function () {
        //             beforeEach(function () {
        //                 mockPrompt({ name: 'module', example: true, coffee: true });
        //             });

        //             it('should add a CoffeeScript module definition file', function (done) {
        //                 gulp.start('default').once('stop', function () {
        //                     mockGulpDest.assertDestContains('src/app/todo/todo.coffee');
        //                     done();
        //                 });
        //             });

        //             it('should add a CoffeeScript Todo controller with a corresponding test file', function (done) {
        //                 gulp.start('default').once('stop', function () {
        //                     mockGulpDest.assertDestContains([
        //                         'src/app/todo/todo-controller.coffee',
        //                         'src/app/todo/todo-controller_test.coffee'
        //                     ]);
        //                     done();
        //                 });
        //             });
        //         });
        //     });

        // });

        // describe('CSS files', function () {
        //     it('should add stylus stylesheets by default', function (done) {
        //         mockPrompt({ name: 'module', example: true });

        //         gulp.start('default').once('stop', function () {
        //             mockGulpDest.assertDestContains([
        //                 'src/app/app.styl',
        //                 'src/app/styles/_base.styl',
        //                 'src/app/todo/todo.styl'
        //             ]);
        //             done();
        //         });
        //     });

        //     it('should add LESS stylesheets when LESS is chosen', function (done) {
        //         mockPrompt({ name: 'module', csstype: 'less', example: true });

        //         gulp.start('default').once('stop', function () {
        //             mockGulpDest.assertDestContains([
        //                 'src/app/app.less',
        //                 'src/app/styles/_base.less',
        //                 'src/app/todo/todo.less'
        //             ]);
        //             done();
        //         });
        //     });

        //     it('should add Sass stylesheets when Sass is chosen', function (done) {
        //         mockPrompt({ name: 'module', csstype: 'sass', example: true });

        //         gulp.start('default').once('stop', function () {
        //             mockGulpDest.assertDestContains([
        //                 'src/app/app.scss',
        //                 'src/app/styles/_base.scss',
        //                 'src/app/todo/todo.scss'
        //             ]);
        //             done();
        //         });
        //     });
        // });

    });
});

/**
 * Mock inquirer prompt
 */
function mockPrompt(answers) {
    inquirer.prompt = function (prompts, done) {
        [].concat(prompts).forEach(function (prompt) {
            if (!(prompt.name in answers)) {
                answers[prompt.name] = prompt.default;
            }
        });
        done(answers);
    };
}

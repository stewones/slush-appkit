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
        process.chdir('playground');
    });

    describe('default generator', function () {
        beforeEach(function () {
            mockPrompt({ name: 'TestNewApp', moveon: true });
        });

        it('should create a new application', function (done) {
            gulp.start('default').once('stop', function () {
                mockGulpDest.assertDestContains({
                    client: {
                        src: {
                            app: {
                                constants: [],
                                core: [],
                                errors: [],
                                modules: [],
                                themes: [],
                                _: [
                                    //'app.module.js', //this is only generated in dev mode
                                    'app.config.js',
                                    'app.run.js'
                                ]
                            },
                            _: [
                                'index.html'
                            ]
                        },
                        _: [
                            'bower.json',
                            'gulpfile.js',
                            'karma.conf.js',
                            'package.json'
                        ]
                    },
                    server: {
                        _: [
                            'package.json',
                            'routes.js',
                            'server.js'
                        ]
                    },
                    _: [
                        '.gitignore',
                        'appkit.json',
                        'README.md'
                    ]
                });
                done();
            });
        });
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

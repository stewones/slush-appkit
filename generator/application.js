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

module.exports = function (_, gulp, gulpif, install, conflict, template, rename, inquirer, colors, path, injectAngularModules) {

    //creates a new app
    gulp.task('default', application);

    function application(done) {
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
                var inject = [__dirname + '/../template/application/**', '!' + __dirname + '/../template/application/client/src/app/app.module.js'];

                answers.modules = [];


                //testing mode
                if (process.env.NODE_ENV === 'test') {
                    return gulp.src(inject) // Note use of __dirname to be relative to generator
                        .pipe(template(answers))                 // Lodash template support
                        .pipe(rename(function (path) {
                            if (path.basename[0] === '_') { //rename _ to .
                                path.basename = '.' + path.basename.slice(1);
                            }
                        }))
                        .pipe(gulp.dest('./'))                   // Without __dirname here = relative to cwd
                        .on('finish', function () { done(); });
                } else {
                    return gulp.src(inject) // Note use of __dirname to be relative to generator
                        .pipe(template(answers))                 // Lodash template support
                        .pipe(rename(function (path) {
                            if (path.basename[0] === '_') { //rename _ to .
                                path.basename = '.' + path.basename.slice(1);
                            }
                        }))
                        .pipe(conflict('./'))                    // Confirms overwrites on file conflicts
                        .pipe(gulp.dest('./'))                   // Without __dirname here = relative to cwd
                        .pipe(install())
                        .on('end', function () {
                            //generates client app.module.js   
                            injectAngularModules(answers.name).on('finish', function () {
                                console.log('####################################################'.green);
                                console.log('#####                                          #####'.green);
                                console.log('#####   New application successfully created   #####'.green);
                                console.log('#####                                          #####'.green);
                                console.log('####################################################'.green);
                                done();
                            });
                        })
                        .resume();
                }
            });
    }
    return gulp;
}
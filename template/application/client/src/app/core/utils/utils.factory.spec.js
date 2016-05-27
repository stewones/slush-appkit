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
/* global jasmine, moment*/
describe('Utils Service', function () {
    var utils, rootScope;
    beforeEach(module('core.utils'));
    beforeEach(inject(function ($rootScope, _$utils_) {
        utils = _$utils_;
        rootScope = $rootScope;
    }));

    describe('reponse', function () {
        it('should return the methods', function () {
            expect(typeof utils.isImg).toEqual('function');
            expect(typeof utils.brStates).toEqual('function');
            expect(typeof utils.age).toEqual('function');
        });
    });

    describe('isImg: test if the url is an image', function () {
        it('should return result of a promise', function () {
            expect(utils.isImg('https://livejob.s3-sa-east-1.amazonaws.com/livejob-blue.png').$$state.status).toEqual(0);
        });
    });
    describe('age: convert date (en format) to years', function () {
        it('should return age', function () {
            moment.locale('en');
            expect(utils.age('1986-07-13')).toEqual(jasmine.stringMatching('years'));
        });
    });
    describe('brStates: return a list of states of Brazil', function () {
        it('needs to have name and value', function () {
            expect(utils.brStates()[0].name).toBeDefined();
            expect(utils.brStates()[0].value).toBeDefined();
        });
    });
});
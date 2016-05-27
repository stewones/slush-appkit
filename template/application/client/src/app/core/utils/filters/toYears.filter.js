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
(function () {
    'use strict';
    //
    // Usage:
    // {{months | toYears }}
    //
    angular.module('core.utils').filter('toYears', /*@ngInject*/ function () {
        return function (value) {
            if (!value) return '';
            var what = value,
                stringYear = '',
                stringMonth = '';
            if (value >= 12) {
                what = value / 12;
                if (isFloat(what)) {
                    var real = what, //1.25
                        years = parseInt(real), //1
                        months = Math.floor((real - years) * 10);
                    if (years)
                        stringYear = years + ' ano' + ((years > 1) ? 's' : '');
                    if (months)
                        stringMonth = ' e ' + months + ' mes' + ((months > 1) ? 'es' : '');
                } else {
                    stringYear = what + ' ano' + ((what > 1) ? 's' : '');
                }
            } else {
                stringMonth = value + ' mes' + ((value > 1) ? 'es' : '');
            }
            return stringYear + stringMonth;
        }

        function isFloat(n) {
            return n === Number(n) && n % 1 !== 0
        }
    });
})();
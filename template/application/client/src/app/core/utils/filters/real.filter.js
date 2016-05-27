/**
 * slush-appkit provides a modular workflow to scaffolding and build web applications
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
    /**
     * @ngdoc filter
     * @name core.utils.filter:real
     * @description 
     * Adicionar mascára de moeda no formato real (BR)
     * @param {string} value valor
     * @param {bool} prefix prefixo R$
     * @example
     * <pre>
     * {{some_text | real:true}}
     * </pre>
     **/
    angular.module('core.utils').filter('real', /*@ngInject*/ function () {
        return function (input, prefix) {
            return prefix ? 'R$ ' : '' + formatReal(input);
        }

        function formatReal(int) {
            var tmp = int + '';
            var res = tmp.replace('.', '');
            tmp = res.replace(',', '');
            var neg = false;
            if (tmp.indexOf('-') === 0) {
                neg = true;
                tmp = tmp.replace('-', '');
            }
            if (tmp.length === 1) {
                tmp = '0' + tmp;
            }
            tmp = tmp.replace(/([0-9]{2})$/g, ',$1');
            if (tmp.length > 6) {
                tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
            }
            if (tmp.length > 9) {
                tmp = tmp.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, '.$1.$2,$3');
            }
            if (tmp.length > 12) {
                tmp = tmp.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, '.$1.$2.$3,$4');
            }
            if (tmp.indexOf('.') === 0) {
                tmp = tmp.replace('.', '');
            }
            if (tmp.indexOf(',') === 0) {
                tmp = tmp.replace(',', '0,');
            }
            return neg ? '-' + tmp : tmp;
        }
    });
})();
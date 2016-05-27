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
     * @ngdoc service
     * @name core.user.service:$User
     **/
    angular.module('core.user').service('$User', /*@ngInject*/ function ($auth, lodash) {
        var _ = lodash,
            self = this;
        var $User = function (params) {
            params = params ? params : {};
            if (!params.currentData) params.currentData = {};
            if (!params.filial) {
                params.filial = {
                    id: null
                }
            }
            angular.extend(this, params);
        }
        $User.prototype.isAuthed = isAuthed;
        /**
         * @ngdoc function
         * @name core.user.service:$User:current
         * @methodOf core.user.service:$User
         * @description
         * Adiciona informações customizadas no formato chave:valor à instância corrente do usuário
         * @example
         * <pre>
         * var user = new $User();
         * user.current('company',{_id: 123456, name: 'CocaCola'})
         * console.log(user.current('company')) //prints {_id: 123456, name: 'CocaCola'}
         * </pre>
         * @param {string} key chave
         * @param {*} val valor
         */
        $User.prototype.current = current;

        function isAuthed() {
            return $auth.isAuthenticated();
        }

        function current(key, val) {
            if (key && val) {
                this.currentData[key] = val;
            } else if (key) {
                return this.currentData && this.currentData[key] ? this.currentData[key] : false;
            }
            return this.currentData;
        }
        return $User;
    });
})();
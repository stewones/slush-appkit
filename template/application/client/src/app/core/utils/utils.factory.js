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
     * @ngdoc object
     * @name core.utils.factory:$utils
     * @requires setting
     **/
    angular.module('core.utils').factory('$utils', /*@ngInject*/ function ($q, $user, $http, $log, api, lodash) {
        var vm = this;
        var _ = lodash;
        return {
            isImg: isImg,
            brStates: brStates,
            age: age,
            stripHtmlTags: stripHtmlTags,
            confirm: confirm,
            setupUserLimit: setupUserLimit
        }

        function isImg(src) {
            var deferred = $q.defer();
            var image = new Image();
            image.onerror = function () {
                deferred.resolve(false);
            };
            image.onload = function () {
                deferred.resolve(true);
            };
            image.src = src;
            return deferred.promise;
        }

        function age(date) {
            return moment(date).fromNow(true);
        }

        function brStates() {
            return [{
                value: "AC",
                name: "Acre"
            }, {
                    value: "AL",
                    name: "Alagoas"
                }, {
                    value: "AM",
                    name: "Amazonas"
                }, {
                    value: "AP",
                    name: "Amapá"
                }, {
                    value: "BA",
                    name: "Bahia"
                }, {
                    value: "CE",
                    name: "Ceará"
                }, {
                    value: "DF",
                    name: "Distrito Federal"
                }, {
                    value: "ES",
                    name: "Espírito Santo"
                }, {
                    value: "GO",
                    name: "Goiás"
                }, {
                    value: "MA",
                    name: "Maranhão"
                }, {
                    value: "MT",
                    name: "Mato Grosso"
                }, {
                    value: "MS",
                    name: "Mato Grosso do Sul"
                }, {
                    value: "MG",
                    name: "Minas Gerais"
                }, {
                    value: "PA",
                    name: "Pará"
                }, {
                    value: "PB",
                    name: "Paraíba"
                }, {
                    value: "PR",
                    name: "Paraná"
                }, {
                    value: "PE",
                    name: "Pernambuco"
                }, {
                    value: "PI",
                    name: "Piauí"
                }, {
                    value: "RJ",
                    name: "Rio de Janeiro"
                }, {
                    value: "RN",
                    name: "Rio Grande do Norte"
                }, {
                    value: "RO",
                    name: "Rondônia"
                }, {
                    value: "RS",
                    name: "Rio Grande do Sul"
                }, {
                    value: "RR",
                    name: "Roraima"
                }, {
                    value: "SC",
                    name: "Santa Catarina"
                }, {
                    value: "SE",
                    name: "Sergipe"
                }, {
                    value: "SP",
                    name: "São Paulo"
                }, {
                    value: "TO",
                    name: "Tocantins"
                }];
        }

        function stripHtmlTags(string) {
            return string.replace(/(<([^>]+)>)/ig, "");
        }
 
        function setupUserLimit(_params) {
            var deferred = $q.defer();
            var params = {
                url: api.url,
                c: encodeURIComponent($user.instance().company.id),
                f: encodeURIComponent($user.instance().filial.id)
            }
            _.extend(params, _params);
            var segment = $user.instance().type.id === 1 ? 'filials' : 'companies';
            //var segment = 'companies';
            var url = params.url + '/api/' + segment + '/setup-limit-user-total/'; //?callback=JSON_CALLBACK
            url += '?f=' + encodeURIComponent(params.f);
            url += '&c=' + encodeURIComponent(params.c);


            $http.get(url).then(function (response) {
                deferred.resolve(response.data);
            }, function (response) {
                var log = 'cant load user limit ' + segment;
                $log.warn(log);
                deferred.reject(log);
            });
            return deferred.promise;
        }
    });
})();
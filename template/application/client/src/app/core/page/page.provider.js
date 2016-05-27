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
    /**
     * @ngdoc object
     * @name core.page.provider:$page
     **/
    angular.module('core.page').provider('$page',
        /**
         * @ngdoc object
         * @name core.page.$pageProvider
         * @description
         * Provém configurações/comportamentos/estados para página
         **/
        /*@ngInject*/
        function $pageProvider() {
            /**
             * @ngdoc object
             * @name core.page.$pageProvider#_config
             * @propertyOf core.page.$pageProvider
             * @description
             * armazena configurações
             **/
            this._config = {
                // configuração para ativar/desativar a rota inicial
                'homeEnabled': true
            };
            /**
             * @ngdoc object
             * @name core.page.$pageProvider#_title
             * @propertyOf core.page.$pageProvider
             * @description
             * armazena o título
             **/
            this._title = '';
            /**
             * @ngdoc object
             * @name core.page.$pageProvider#_description
             * @propertyOf core.page.$pageProvider
             * @description
             * armazena a descrição
             **/
            this._description = '';
            /**
             * @ngdoc object
             * @name core.page.$pageProvider#_keywords
             * @propertyOf core.page.$pageProvider
             * @description
             * store keywords
             **/
            this._keywords = '';
            /**
             * @ngdoc object
             * @name core.page.$pageProvider#_icon
             * @propertyOf core.page.$pageProvider
             * @description
             * store favicon
             **/
            this._icon = '';
            /**
             * @ngdoc object
             * @name core.page.$pageProvider#_ogSiteName
             * @propertyOf core.page.$pageProvider
             * @description
             * armazena open graph site name
             **/
            this._ogSiteName = '';
            /**
             * @ngdoc object
             * @name core.page.$pageProvider#_ogTitle
             * @propertyOf core.page.$pageProvider
             * @description
             * armazena open graph title
             **/
            this._ogTitle = '';
            /**
             * @ngdoc object
             * @name core.page.$pageProvider#_ogDescription
             * @propertyOf core.page.$pageProvider
             * @description
             * armazena open graph description
             **/
            this._ogDescription = '';
            /**
             * @ngdoc object
             * @name core.page.$pageProvider#_ogUrl
             * @propertyOf core.page.$pageProvider
             * @description
             * armazena open graph url
             **/
            this._ogUrl = '';
            /**
             * @ngdoc object
             * @name core.page.$pageProvider#_ogImage
             * @propertyOf core.page.$pageProvider
             * @description
             * armazena open graph image
             **/
            this._ogImage = '';
            /**
             * @ngdoc object
             * @name core.page.$pageProvider#_ogSection
             * @propertyOf core.page.$pageProvider
             * @description
             * armazena open graph section
             **/
            this._ogSection = '';
            /**
             * @ngdoc object
             * @name core.page.$pageProvider#_ogTag
             * @propertyOf core.page.$pageProvider
             * @description
             * armazena open graph tags
             **/
            this._ogTag = '';
            /**
             * @ngdoc function
             * @name core.page.$pageProvider#$get
             * @propertyOf core.page.$pageProvider
             * @description
             * getter que vira factory pelo angular para se tornar injetável em toda aplicação
             * @example
             * <pre>
             * angular.module('myApp.module').controller('MyCtrl', function($page) {
             *      console.log($page.config('myOwnConfiguration'));
             *      //prints the current config
             *      //ex.: "{ configA: 54, configB: '=D' }"
             * })
             * </pre>
             * @return {object} Retorna um objeto contendo valores das propriedades.
             **/
            this.$get = this.get = /*@ngInject*/ function ($utils) {
                return {
                    config: this._config,
                    load: load(),
                    progress: progress(),
                    // toast: toast($mdToast),
                    title: title,
                    description: description,
                    keywords: keywords,
                    icon: icon,
                    ogLocale: ogLocale,
                    ogSiteName: ogSiteName,
                    ogTitle: ogTitle,
                    ogDescription: ogDescription,
                    ogUrl: ogUrl,
                    ogImage: ogImage,
                    ogSection: ogSection,
                    ogTag: ogTag,
                    applySEO: applySEO
                }

                function applySEO(setting) {
                    if (!setting) var setting = {};
                    //
                    // SEO
                    //
                    this.title(setting.title);
                    this.description($utils.stripHtmlTags(setting.description));
                    this.keywords(setting.keywords);
                    this.icon(setting.icon);
                    //
                    // OPEN GRAPH
                    //
                    this.ogLocale(setting.ogLocale);
                    this.ogSiteName(setting.ogSiteName);
                    this.ogTitle(setting.ogTitle);
                    this.ogDescription($utils.stripHtmlTags(setting.ogDescription));
                    this.ogUrl(setting.ogUrl.replace('https://', 'http://')); //because https fails ?
                    this.ogImage(setting.ogImage);
                    this.ogSection(setting.ogSection);
                    this.ogTag(setting.ogTag);
                }
            }
            /**
             * @ngdoc function
             * @name core.page.$pageProvider#config
             * @methodOf core.page.$pageProvider
             * @description
             * getter/setter para configurações
             * @example
             * <pre>
             * angular.module('myApp.module').config(function($pageProvider) {
             *     $pageProvider.config('myOwnConfiguration', {
             *          configA: 54,
             *          configB: '=D'
             *      })
             * })
             * </pre>
             * @param {string} key chave
             * @param {*} val valor
             **/
            this.config = function (key, val) {
                if (key && (val || val === false)) {
                    return this._config[key] = val
                } else if (key) {
                    return this._config[key]
                } else {
                    return this._config
                }
            }
            this.closeMenu = function () {
                return function ($timeout, $auth, $menu) {
                    if ($auth.isAuthenticated()) {
                        $timeout(function () {
                            $menu.api().close();
                        }, 500);
                    }
                }
            };
            /**
             * @ngdoc function
             * @name core.page.$pageProvider#title
             * @methodOf core.page.$pageProvider
             * @description
             * getter/getter para meta tag título
             * @param {string} str título da página
             * @return {string} título da página
             **/
            function title(value) {
                if (value) return this._title = value;
                else return this._title;
            }
            /**
             * @ngdoc function
             * @name core.page.$pageProvider#description
             * @methodOf core.page.$pageProvider
             * @description
             * getter/getter para meta tag descrição
             * @param {string} value descrição da página
             **/
            function description(value) {
                if (value) return this._description = value;
                else return this._description;
            }
            /**
             * @ngdoc function
             * @name core.page.$pageProvider#keywords
             * @methodOf core.page.$pageProvider
             * @description
             * getter/getter for keywords
             * @param {string} value
             **/
            function keywords(value) {
                if (value) return this._keywords = value;
                else return this._keywords;
            }
            /**
             * @ngdoc function
             * @name core.page.$pageProvider#icon
             * @methodOf core.page.$pageProvider
             * @description
             * getter/getter for page favicon
             * @param {string} value
             **/
            function icon(value) {
                if (value) return this._icon = value;
                else return this._icon;
            }
            /**
             * @ngdoc function
             * @name core.page.$pageProvider#ogLocale
             * @methodOf core.page.$pageProvider
             * @description
             * getter/getter para open-graph locale
             * @param {string} value locale
             **/
            function ogLocale(value) {
                if (value) return this._ogLocale = value;
                else return this._ogLocale;
            }
            /**
             * @ngdoc function
             * @name core.page.$pageProvider#ogSiteName
             * @methodOf core.page.$pageProvider
             * @description
             * getter/getter para open-graph site name
             * @param {string} value site name
             **/
            function ogSiteName(value) {
                if (value) return this._ogSiteName = value;
                else return this._ogSiteName;
            }
            /**
             * @ngdoc function
             * @name core.page.$pageProvider#ogTitle
             * @methodOf core.page.$pageProvider
             * @description
             * getter/getter para open-graph title
             * @param {string} value title
             **/
            function ogTitle(value) {
                if (value) return this._ogTitle = value;
                else return this._ogTitle;
            }
            /**
             * @ngdoc function
             * @name core.page.$pageProvider#ogDescription
             * @methodOf core.page.$pageProvider
             * @description
             * getter/getter para open-graph description
             * @param {string} value description
             **/
            function ogDescription(value) {
                if (value) return this._ogDescription = value;
                else return this._ogDescription;
            }
            /**
             * @ngdoc function
             * @name core.page.$pageProvider#ogUrl
             * @methodOf core.page.$pageProvider
             * @description
             * getter/getter para open-graph url
             * @param {string} value url
             **/
            function ogUrl(value) {
                if (value) return this._ogUrl = value;
                else return this._ogUrl;
            }
            /**
             * @ngdoc function
             * @name core.page.$pageProvider#ogImage
             * @methodOf core.page.$pageProvider
             * @description
             * getter/getter para open-graph image
             * @param {string} value image
             **/
            function ogImage(value) {
                if (value) return this._ogImage = value;
                else return this._ogImage;
            }
            /**
             * @ngdoc function
             * @name core.page.$pageProvider#ogSection
             * @methodOf core.page.$pageProvider
             * @description
             * getter/getter para open-graph section
             * @param {string} value section
             **/
            function ogSection(value) {
                if (value) return this._ogSection = value;
                else return this._ogSection;
            }
            /**
             * @ngdoc function
             * @name core.page.$pageProvider#ogTag
             * @methodOf core.page.$pageProvider
             * @description
             * getter/getter para open-graph tag
             * @param {string} value tag
             **/
            function ogTag(value) {
                if (value) return this._ogTag = value;
                else return this._ogTag;
            }
            /**
             * @ngdoc function
             * @name core.page.$pageProvider#load
             * @methodOf core.page.$pageProvider
             * @description
             * inicia e termina o carregamento da página
             * @return {object} com metodos de inicialização (init) e finalização (done)
             **/
            function load() {
                return {
                    init: function () {
                        this.status = true;
                        //console.log('loader iniciado...' + this.status);
                    },
                    done: function () {
                        this.status = false;
                        //console.log('loader finalizado...' + this.status);
                    }
                }
            }
            /**
             * @ngdoc function
             * @name core.page.$pageProvider#toast
             * @methodOf core.page.$pageProvider
             * @description
             * mostra uma mensagem de aviso
             * @param {string} msg mensagem
             * @param {integer} time tempo em milisegundos
             * @param {string} position posição do alerta. default: 'bottom right'
             **/
            function toast() {
                return function (msg, time, position) {
                    time = time ? time : 5000;
                    // $mdToast.show($mdToast.simple().content(msg).position(position ? position : 'bottom right').hideDelay(time));
                }
            }
            //another type of load
            function progress() {
                return {
                    init: function () {
                        this.status = true;
                        //console.log('progress iniciado...' + this.status);
                    },
                    done: function () {
                        this.status = false;
                        //console.log('progress finalizado...' + this.status);
                    }
                }
            }
        });
})();
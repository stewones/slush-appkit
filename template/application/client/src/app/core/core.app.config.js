/**
 * slush-appkit provides a modular workflow to build web applications
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
     * @name core.app.config
     * @requires setting
     **/
    angular.module('core.app').config( /*@ngInject*/ function ($appProvider, $logProvider, $urlMatcherFactoryProvider, $stateProvider, $urlRouterProvider, $locationProvider, $authProvider, $httpProvider, $userProvider, $sessionStorageProvider, $translateProvider, enviroment, setting, api) {
        //
        // States & Routes
        //    
        $stateProvider.state('app', {
            abstract: true,
            views: {
                'app': {
                    templateUrl: /*@ngInject*/ function () {
                        return $appProvider.layoutUrl();
                    }
                }
            }
        });
        $locationProvider.html5Mode(true);
        //
        // Redirect Trailing Slash
        //
        $urlMatcherFactoryProvider.strictMode(false);
        $urlRouterProvider.rule(function ($injector, $location) {
            //
            // if the app was not loaded inside iframe (url with #iframe)
            //
            if ($location.hash() !== 'iframe') {
                var path = $location.url();
                // check to see if the path already has a slash where it should be
                if (path[path.length - 1] === '/' || path.indexOf('/?') > -1) {
                    return;
                }
                if (path.indexOf('?') > -1) {
                    return path.replace('?', '/?');
                }
                return path + '/';
            }
        });
        //
        // Intercept Http
        //
        $httpProvider.interceptors.push('HttpInterceptor');

        //
        // Storage options
        //
        $sessionStorageProvider.setKeyPrefix(setting.slug + '.');
        //
        // i18n options
        //
        $translateProvider.preferredLanguage(setting.locale);
        $translateProvider.useSanitizeValueStrategy('escape');
        //
        // Debug options
        //
        if (enviroment === 'production') $logProvider.debugEnabled(false);
        else $logProvider.debugEnabled(true);
    });
})();
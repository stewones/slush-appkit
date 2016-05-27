(function () {
    'use strict';
    /**
     * @ngdoc object
     * @name app.pages.module:config
     **/
    angular.module('pages.module').config( /*@ngInject*/ function ($stateProvider, $urlRouterProvider) {
        //
        // Routes
        //
        $stateProvider.state('app.home', {
            url: '/',
            views: {
                'content': {
                    templateUrl: 'app/modules/pages/templates/home.html',
                    controllerAs: 'vm'
                }
            }
        }).state('app.401', {
            title: '401',
            url: '/401/',
            views: {
                'content': {
                    templateUrl: 'app/errors/401.tpl.html'
                }
            },
            resolve: {
                slug: /*@ngInject*/ function ($stateParams) {
                    return $stateParams.slug;
                }
            }
        }).state('app.404', {
            title: '404',
            url: '/404/',
            views: {
                'content': {
                    templateUrl: 'app/errors/404.tpl.html'
                }
            },
            resolve: {
                slug: /*@ngInject*/ function ($stateParams) {
                    return $stateParams.slug;
                }
            }
        }).state('app.417', {
            title: '417',
            url: '/417/',
            views: {
                'content': {
                    templateUrl: 'app/errors/417.tpl.html',
                    controller: 'PagesCtrl',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                slug: /*@ngInject*/ function ($stateParams) {
                    return $stateParams.slug;
                }
            }
        });

        $urlRouterProvider.otherwise('/404');

    });
})();
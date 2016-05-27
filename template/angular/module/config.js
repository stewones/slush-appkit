(function () {
    'use strict';
    /**
     * @ngdoc object
     * @name app.<%= moduleName %>.config
     **/
    angular.module('<%= moduleName %>.module').config( /*@ngInject*/ function ($stateProvider) {
        //
        // Routes
        //
        $stateProvider
            //
            // Add
            //
            .state('app.<%= moduleName %>-add', {
                url: '/<%= moduleName %>/add',
                title: 'New <%= moduleName %>',
                views: {
                    'content': {
                        templateUrl: 'app/modules/<%= moduleName %>/crud/<%= moduleName %>-add.html',
                        controller: '<%= moduleNameStartCase %>Ctrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {

                }
            })
            //
            // List
            //
            .state('app.<%= moduleName %>-list', {
                url: '/<%= moduleName %>/',
                title: 'Listing <%= moduleName %>',
                views: {
                    'content': {
                        templateUrl: 'app/modules/<%= moduleName %>/crud/<%= moduleName %>-list.html',
                        controller: '<%= moduleNameStartCase %>Ctrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {

                }
            })
            //
            // View
            //
            .state('app.<%= moduleName %>-view', {
                url: '/<%= moduleName %>/:id',
                title: 'View of <%= moduleName %>',
                views: {
                    'content': {
                        templateUrl: 'app/modules/<%= moduleName %>/crud/<%= moduleName %>-view.html',
                        controller: '<%= moduleNameStartCase %>Ctrl',
                        controllerAs: 'vm'
                    }
                },
                resolve: {

                }
            });
    });
})();
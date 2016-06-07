/**
 * @ngdoc object
 * @name app.<%= moduleName %>.module.directive:<%= directiveName %>
 **/
(function () {
    'use strict';
    angular.module('<%= moduleName %>.module').directive('<%= directiveName %>', /*@ngInject*/ function ($rootScope, $timeout) {
        return {
            scope: {
                ngModel: '='
            },
            templateUrl: "app/modules/<%= moduleName %>/directives/<%= directiveName %>/<%= directiveName %>.directive.html",
            bindToController: true,
            controllerAs: 'vm',
            controller: /*@ngInject*/ function ($scope) {
                var vm = this;
                //ctrl code
            },
            link: function ($scope, $elem, $attr) {
                //link code
            }
        }
    });
})();
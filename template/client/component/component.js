/**
 * @ngdoc object
 * @name app.<%= moduleName %>.module.component:<%= componentName %>
 **/
(function () {
    'use strict';
    angular.module('<%= moduleName %>.module').component('<%= componentName %>', {
        bindings: {
            ngModel: '='
        },
        templateUrl: "app/modules/<%= moduleName %>/components/<%= componentName %>/<%= componentName %>.component.html",
        controller: /*@ngInject*/ function ($scope) {
            var vm = this;
        }
    });
});
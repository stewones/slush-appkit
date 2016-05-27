/**
 * @ngdoc object
 * @name app.<%= moduleName %>.component:<%= componentName %>
 **/
(function () {
    'use strict';
    angular.module('<%= moduleName %>').component('<%= componentName %>', {
        bindings: {
            ngModel: '='
        },
        templateUrl: "app/modules/<%= moduleName %>/components/<%= componentName %>/<%= componentName %>.html",
        controller: /*@ngInject*/ function ($scope) {
            var vm = this;
        }
    });
});
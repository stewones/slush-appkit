/**
 * @ngdoc object
 * @name app.<%= moduleName %>.module.filter:<%= filterName %>
 **/
(function () {
    'use strict';
    angular.module('<%= moduleName %>.module').filter('<%= filterName %>', /*@ngInject*/ function (lodash) {
        var _ = lodash;
        return function (value) {
            return value;
        }
    });
});
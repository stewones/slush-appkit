(function () {
    'use strict';
    /**
     * @ngdoc object
     * @name app.<%= moduleName %>.module.factory:<%= factoryName %>
     **/
    angular.module('<%= moduleName %>.module').factory('<%= factoryName %>', /*@ngInject*/ function (lodash) {
        var _ = lodash;
        var vm = this;
        return {
            method: method
        }
        function method() {
            //code goes here
        }
    });
});
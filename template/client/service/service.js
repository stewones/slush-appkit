(function () {
    'use strict';
    /**
     * @ngdoc object
     * @name app.<%= moduleName %>.module.service:<%= serviceNameStartCase %>
     **/
    angular.module('<%= moduleName %>.module').service('<%= serviceNameStartCase %>', /*@ngInject*/ function (lodash) {
        var _ = lodash;
        var <%= serviceNameStartCase %> = function (params) {
            params = params ? params : {};
            angular.extend(this, params);
        }
        <%= serviceNameStartCase %>.prototype.method = method;
        function method() {
            //code goes here    
        }
        return <%= serviceNameStartCase %>;
    });
})();
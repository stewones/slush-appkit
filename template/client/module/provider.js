(function () {
    'use strict';
    /**
     * @ngdoc object
     * @name app.<%= moduleName %>.module.provider
     **/
    angular.module('<%= moduleName %>.module').provider('<%= moduleName %>', /*@ngInject*/ function <%= moduleName %>Provider() {
        this.$get = this.get = /*@ngInject*/ function ($scope, lodash) {
            var _ = lodash;
            return {
                //this.methods     
            }
        }
        //this.methods
    });
})();
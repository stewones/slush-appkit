/**
 * @ngdoc object
 * @name app.<%= moduleName %>.controller:<%= controllerName %>
 * @requires core.page.factory:$page
 * @requires setting
 **/
(function () {
    'use strict';
    angular.module('<%= moduleName %>').controller('<%= controllerName %>', /*@ngInject*/ function ($page, setting) {
        var vm = this;
        /**
         *
         * SEO
         * 
         **/
        $page.title(setting.name + setting.titleSeparator + ' ');
        boot();

        function boot() { }
    });
})();
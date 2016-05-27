/**
 * @ngdoc object
 * @name app.<%= moduleName %>.controller:<%= controllerNameStartCase %>Ctrl
 * @requires core.page.factory:$page
 * @requires setting
 **/
(function () {
    'use strict';
    angular.module('<%= moduleName %>.module').controller('<%= controllerNameStartCase %>Ctrl', /*@ngInject*/ function ($page, setting) {
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
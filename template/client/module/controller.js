(function () {
    'use strict';
    /**
    * @ngdoc object
    * @name app.<%= moduleName %>.controller:<%= moduleNameStartCase %>Ctrl
    * @requires core.page.factory:$page
    * @requires setting
    **/
    angular.module('<%= moduleName %>.module').controller('<%= moduleNameStartCase %>Ctrl', /*@ngInject*/ function ($page, setting) {
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
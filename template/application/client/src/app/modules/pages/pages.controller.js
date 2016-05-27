(function () {
    'use strict';
    /**
     * @ngdoc object
     * @name app.pages.module.controller:PagesCtrl
     **/
    angular.module('pages.module').controller('PagesCtrl', /*@ngInject*/ function ($page, setting, $state) {
        var vm = this;
        //
        // SEO
        //
        $page.title($state.current.title + setting.titleSeparator + ' ' + setting.name);
        $page.description('');
        //
        // Events
        //
        //
        // Watchers
        //
        //
        // Bootstrap
        //
        //
        bootstrap();

        function bootstrap() {
            vm.setting = function () {
                return setting;
            }
        }
    });
})();
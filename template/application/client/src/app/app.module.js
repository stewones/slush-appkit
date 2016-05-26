(function () {
    'use strict';
    /**
     * @ngdoc object
     * @name app.module
     **/
    angular.module('<%= nameCamel %>', [
        //
        // Load core appkit
        //
        'core.app',
        //
        // Load 3rd party
        //
        'pages.module'
    ]);
})();
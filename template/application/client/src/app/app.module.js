(function () {
    'use strict';
    /**
     * @ngdoc object
     * @name app.module
     **/
    angular.module('<%= name||"appkit" %>', [
        //
        // Load core appkit
        //
        
        'core.app',
        
        //
        // Load 3rd party
        //
        <% _.forEach(modules, function (module, i) { %>
        '<%= module %>.module'<% if (i != modules.length-1) { %>,<% } %>         
        <% }); %>
    ]);
})();
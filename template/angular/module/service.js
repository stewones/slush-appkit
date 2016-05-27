(function () {
    'use strict';
    /**
     * @ngdoc object
     * @name <%= moduleName %>.module.service:<%= moduleNameStartCase %>
     **/
    angular.module('<%= moduleName %>.module').service('<%= moduleNameStartCase %>', /*@ngInject*/ function ($q, $sessionStorage, $http, $timeout, $log, lodash) {
        var _ = lodash,
            self = this;
        var <%= moduleNameStartCase %> = function (params) {
            params = params ? params : {};
            params.busy = params.busy ? params.busy : false;
            angular.extend(this, params);
        }
    <%= moduleNameStartCase %>.prototype.save = save;

        // Persistence
        function save(cloud) {
            //
            // Creating a promise
            //
            var deferred = $q.defer();
            //
            // Persistis data
            //
            if (!this.id)
                $sessionStorage.new<%= moduleNameStartCase %> = this;
        else
            $sessionStorage.open<%= moduleNameStartCase %> = this;

            if (cloud) {
                var url = 'api_url_goes_here'
                if (this.id) {
                    $http.put(url, this).success(function (response) {
                        deferred.resolve(response);
                    }).error(function (response) {
                        $log.error('impossible to save <%= moduleNameStartCase %>', response);
                        deferred.reject(response);
                    });
                } else {
                    $http.post(url, this).success(function (response) {
                        deferred.resolve(response);
                    }).error(function (response) {
                        $log.error('impossible to create <%= moduleNameStartCase %>', response);
                        deferred.reject(response);
                    });
                }
            }
            return deferred.promise;
        }
        return <%= moduleNameStartCase %>;
    });
})();
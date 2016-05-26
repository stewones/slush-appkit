'use strict';
angular.module('user.module').component('userSetupLimit', {
    bindings: {
        hideCreate: '='
    },
    templateUrl: "app/modules/user/components/userSetupLimit/userSetupLimit.tpl.html",
    controller: /*@ngInject*/function ($http, $log, $user, $scope, $rootScope, $utils, $state, api) {
        this.cardSubtitle = ($user.instance().type.id === 2) ? 'Acessos atribuídos em ' + $user.instance().company.name : 'Acessos criados em ' + $user.instance().filial.name;
        this.createUser = function () {
            if ($scope.$ctrl.setupTotal >= $scope.$ctrl.setupLimit) {
                $utils.confirm('Atenção', 'Não é possível criar mais usuários.', 'Ok, entendo.', '.').then(function () { });
            } else {
                $state.go('app.user-add');
            }
        }
        var params = {
            url: api.url,
            c: encodeURIComponent($user.instance().company.id),
            f: encodeURIComponent($user.instance().filial.id)
        }
        var segment = $user.instance().type.id === 1 ? 'filials' : 'companies';
        var url = params.url + '/api/' + segment + '/setup-limit-user-total/'; //?callback=JSON_CALLBACK
        url += '?f=' + encodeURIComponent(params.f);
        url += '&c=' + encodeURIComponent(params.c);

        // $rootScope.$on('UserSetupLimitUpdated', function(ev, value) {
        //     if (value) {
        //         var pct = (($scope.$ctrl.setupTotal+value) * 100) / $scope.$ctrl.setupLimit;
        //         $scope.$ctrl.setupPct = pct.toFixed(0);
        //     }
        // });

        $http.get(url).then(function (response) {
            var total = response.data.total;
            var limit = response.data.limit;
            var remains = response.data.remains;
            $scope.$ctrl.setupLimit = limit;
            $scope.$ctrl.setupTotal = total;
            var pct = limit != 0 ? (total * 100) / limit : 0;
            $scope.$ctrl.setupPct = pct.toFixed(0);

            $rootScope.$emit('UserSetupLimit', { limit: limit, total: total, remains: remains });
        }, function (response) {
            $log.warn('cant load user limit', 'segment', segment);
        });
    }
});
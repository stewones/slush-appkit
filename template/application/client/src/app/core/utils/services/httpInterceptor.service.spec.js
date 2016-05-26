'use strict';
/*jshint -W117 */
describe('Http Interceptor Service', function() {
    var Interceptor, rootScope;
    beforeEach(module('core.utils'));
    beforeEach(inject(function($rootScope, _HttpInterceptor_) {
        Interceptor = _HttpInterceptor_;
        rootScope = $rootScope;
    }));

    describe('response', function() {
        it('should define request', function() {
            expect(Interceptor.request(true)).toBeTruthy();
        });
        it('should return response on success', function() {
            expect(Interceptor.response(true)).toBeTruthy();
        });
        it('should return object with status 2 for $q.reject on request error', function() {
            expect(Interceptor.requestError(true).$$state.status).toEqual(2);
        });
        it('should $emit $Unauthorized on response error 401', function() {
            spyOn(rootScope, '$emit');
            Interceptor.responseError({
                status: 401
            });
            expect(rootScope.$emit).toHaveBeenCalledWith('$Unauthorized');
        });
    });
});
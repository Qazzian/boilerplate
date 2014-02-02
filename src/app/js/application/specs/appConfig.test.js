define(['appConfig'],
    function (appConfig) {
        describe('appConfig', function() {
            it('should have a set function', function() {
                expect(appConfig.set).toBeDefined();
            });
            it('should have a get function', function() {
                expect(appConfig.get).toBeDefined();
            });
        });
    });
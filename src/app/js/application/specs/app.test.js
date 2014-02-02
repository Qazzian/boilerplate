define(['app','backbone','marionette'],
    function (App) {
        describe('App', function() {

            it('should be an instanciated object [rather than a function]', function() {
                expect(App.start).not.toBeAFunction();
            });
            it('should have a start function', function() {
                expect(App.start).toBeDefined();
            });
        });
    });